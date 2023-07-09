use libreauth::oath::TOTPBuilder;

#[tauri::command]
pub fn generate_totp(secret: String) -> String {
    let totp = TOTPBuilder::new().base32_key(&secret).finalize().unwrap();

    let token: String = totp.generate();

    token.into()
}
