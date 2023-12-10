// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_store;

mod commands;

fn main() {
    let app = tauri::Builder::default();

    // adding functions to handler
    let app = app.invoke_handler(tauri::generate_handler![]);

    // adding plugins
    let app = app.plugin(tauri_plugin_store::Builder::default().build());

    // running app
    app.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
