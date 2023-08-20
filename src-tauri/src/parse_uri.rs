use google_authenticator_converter::{process_data, Account};

#[tauri::command]
pub(crate) fn parse_data_from_uri(uri: &str) -> Vec<Account> {
    let accounts = process_data(uri).unwrap();

    accounts.into()
}
