// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use commands::{decode_string, encode_string, generate_totp, hash_password, verify_password};
use tauri_plugin_store;

mod commands;
mod otp;
mod proto;
mod proto_ser;
mod utils;
mod ws;

fn main() {
    let app = tauri::Builder::default();

    // adding functions to handler
    let app = app.invoke_handler(tauri::generate_handler![
        hash_password,
        verify_password,
        encode_string,
        decode_string,
        generate_totp
    ]);

    // adding plugins
    let app = app.plugin(tauri_plugin_store::Builder::default().build());

    let app = app.setup(|app| {
        tauri::async_runtime::spawn(async {
            ws::run_ws().await;
        });

        Ok(())
    });

    // running app
    app.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
