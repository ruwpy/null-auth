// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_store;

mod encryption;
mod parse_uri;
mod totp;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            totp::generate_totp,
            encryption::hash_string,
            encryption::verify_hash,
            encryption::encrypt_string,
            encryption::decrypt_string,
            parse_uri::parse_data_from_uri
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
