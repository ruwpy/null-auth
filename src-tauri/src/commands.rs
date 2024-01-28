use crate::otp::{Algorithm, OTP};
use crate::utils::get_key_bytes;
use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Nonce,
};
use argon2::{
    password_hash::{
        rand_core::OsRng as ArgonRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString,
    },
    Argon2,
};
use base64::{engine::general_purpose, Engine as _};

#[tauri::command]
pub async fn hash_password(password: String) -> Result<String, String> {
    let argon2 = Argon2::default();

    let salt = SaltString::generate(&mut ArgonRng);

    let password_hash = argon2.hash_password(password.as_bytes(), &salt).unwrap();

    Ok(password_hash.to_string())
}

#[tauri::command]
pub async fn verify_password(password: String, hash: String) -> Result<bool, String> {
    let argon2 = Argon2::default();

    let parsed_hash = PasswordHash::new(&hash).unwrap();

    let verified = argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok();

    Ok(verified)
}

#[tauri::command]
pub async fn encode_string(str: String, key: String) -> Result<String, String> {
    let key = get_key_bytes(key);

    let cipher = Aes256Gcm::new(&key.into());

    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);

    let ciphertext = cipher.encrypt(&nonce, str.as_bytes()).unwrap();

    let mut ciphertext_with_nonce = Vec::with_capacity(&ciphertext.len() + &nonce.len());
    ciphertext_with_nonce.extend_from_slice(&nonce);
    ciphertext_with_nonce.extend_from_slice(&ciphertext);

    let encoded_ciphertext = general_purpose::STANDARD.encode(&ciphertext_with_nonce);

    Ok(encoded_ciphertext)
}

#[tauri::command]
pub async fn decode_string(str: String, key: String) -> Result<String, String> {
    let key = get_key_bytes(key);

    let cipher = Aes256Gcm::new(&key.into());

    let decoded_ciphertext = general_purpose::STANDARD.decode(str).unwrap();

    let nonce = Nonce::from_slice(&decoded_ciphertext[..12]);
    let ciphertext = &decoded_ciphertext[12..];

    let decrypted_bytes = cipher.decrypt(nonce, ciphertext).unwrap();

    let plaintext = std::str::from_utf8(&decrypted_bytes).unwrap();

    Ok(plaintext.to_string())
}

#[tauri::command]
pub async fn generate_totp(secret: String) -> Result<String, String> {
    let otp = OTP::new(secret, 6, Algorithm::SHA1);

    let code = otp.generate_totp(30);

    Ok(code)
}
