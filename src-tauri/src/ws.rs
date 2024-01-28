use std::collections::{HashMap, HashSet};
use std::sync::{
    atomic::{AtomicUsize, Ordering},
    Arc,
};

use futures::{SinkExt, StreamExt, TryFutureExt};
use tokio::sync::{mpsc, RwLock};
use tokio_stream::wrappers::UnboundedReceiverStream;
use uuid::Uuid;
use warp::ws::{Message, WebSocket};
use warp::Filter;

static CONNECTED_CLIENTS: AtomicUsize = AtomicUsize::new(0);

type Users = Arc<RwLock<HashMap<Uuid, (mpsc::UnboundedSender<Message>, String)>>>;

pub async fn run_ws() {
    let users = Users::default();
    let users = warp::any().map(move || users.clone());

    let chat =
        warp::path::end()
            .and(warp::ws())
            .and(users)
            .map(|ws: warp::ws::Ws, users: Users| {
                ws.on_upgrade(move |socket| user_connected(socket, users.clone()))
            });

    warp::serve(chat).run(([127, 0, 0, 1], 10544)).await;
}

async fn user_connected(ws: WebSocket, users: Users) {
    let connected_clients = CONNECTED_CLIENTS.load(Ordering::Relaxed);

    if connected_clients > 1 {
        eprintln!("Too many clients. Rejecting the connection.");

        return;
    }

    CONNECTED_CLIENTS.fetch_add(1, Ordering::Relaxed);

    let id = Uuid::new_v4();

    println!("New client connected: {}", id);

    let (mut user_ws_tx, mut user_ws_rx) = ws.split();

    let (tx, rx) = mpsc::unbounded_channel();
    let mut rx = UnboundedReceiverStream::new(rx);

    tokio::task::spawn(async move {
        while let Some(message) = rx.next().await {
            user_ws_tx
                .send(message)
                .unwrap_or_else(|e| {
                    eprintln!("websocket send error: {}", e);
                })
                .await;
        }
    });

    if let Some(Ok(msg)) = user_ws_rx.next().await {
        let user_type = msg.to_str().unwrap_or("");

        match user_type {
            "application" | "extension" => {
                let user_type_str = user_type.to_string();

                let existing_types: HashSet<String> = users
                    .read()
                    .await
                    .values()
                    .map(|(_, t)| t.clone())
                    .collect();

                if existing_types.contains(&user_type_str) {
                    user_disconnected(id, &users).await;

                    return;
                }

                println!(
                    "Client {} has registered as {}",
                    &id,
                    &user_type_str.to_uppercase()
                );

                users.write().await.insert(id, (tx.clone(), user_type_str));

                user_message(id, msg, &users).await
            }
            _ => {
                user_disconnected(id, &users).await;

                return;
            }
        }
    }

    while let Some(result) = user_ws_rx.next().await {
        let msg = match result {
            Ok(msg) => msg,
            Err(e) => {
                eprintln!("websocket error(uid={}): {}", id, e);
                break;
            }
        };

        println!("{:?}", msg);

        user_message(id, msg, &users).await;
    }

    user_disconnected(id, &users).await;
}

async fn user_message(id: Uuid, msg: Message, users: &Users) {
    let msg = if let Ok(s) = msg.to_str() {
        s
    } else {
        return;
    };

    for (&uid, (tx, _)) in users.read().await.iter() {
        if id != uid {
            if let Err(_disconnected) = tx.send(Message::text(msg)) {}
        }
    }
}

async fn user_disconnected(id: Uuid, users: &Users) {
    CONNECTED_CLIENTS.fetch_sub(1, Ordering::Relaxed);

    eprintln!("Client has disconnected: {}", id);

    users.write().await.remove(&id);
}
