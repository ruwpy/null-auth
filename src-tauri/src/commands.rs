use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

#[tauri::command]
async fn hash_password(password: &str) -> Result<String, String> {
    let argon2 = Argon2::default();

    let salt = SaltString::generate(&mut OsRng);

    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .expect("Failed to hash password");

    Ok(password_hash.to_string())
}

#[tauri::command]
async fn verify_password(password: &str, hash: &str) -> Result<bool, String> {
    let argon2 = Argon2::default();

    let parsed_hash = PasswordHash::new(&hash).expect("Failed to parse hash");

    let verified = argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok();

    Ok(verified)
}

#[tauri::command]
async fn encode_string() -> Result<(), String> {
    Ok(())
}

#[tauri::command]
async fn decode_string() -> Result<(), String> {
    Ok(())
}
