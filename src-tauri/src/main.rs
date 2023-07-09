// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_store;

mod encryption;
mod totp;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            totp::generate_totp,
            encryption::hash_string,
            encryption::encrypt_string,
            encryption::decrypt_string
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
