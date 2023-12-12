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
pub async fn hash_password(password: &str) -> Result<String, String> {
    let argon2 = Argon2::default();

    let salt = SaltString::generate(&mut ArgonRng);

    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .expect("Failed to hash password");

    Ok(password_hash.to_string())
}

#[tauri::command]
pub async fn verify_password(password: &str, hash: &str) -> Result<bool, String> {
    let argon2 = Argon2::default();

    let parsed_hash = PasswordHash::new(&hash).expect("Failed to parse hash");

    let verified = argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok();

    Ok(verified)
}

#[tauri::command]
pub async fn encode_string(str: &str, key: &str) -> Result<String, String> {
    let key = get_key_bytes(key);

    let cipher = Aes256Gcm::new(&key.into());

    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);

    let ciphertext = cipher
        .encrypt(&nonce, str.as_bytes())
        .expect("Failed to encrypt data");

    let mut ciphertext_with_nonce = Vec::with_capacity(&ciphertext.len() + &nonce.len());
    ciphertext_with_nonce.extend_from_slice(&nonce);
    ciphertext_with_nonce.extend_from_slice(&ciphertext);

    let encoded_ciphertext = general_purpose::STANDARD.encode(&ciphertext_with_nonce);

    Ok(encoded_ciphertext)
}

#[tauri::command]
pub async fn decode_string(str: &str, key: &str) -> Result<String, String> {
    let key = get_key_bytes(key);

    let cipher = Aes256Gcm::new(&key.into());

    let decoded_ciphertext = general_purpose::STANDARD
        .decode(str)
        .expect("Failed to decode data");

    let nonce = &decoded_ciphertext[..12];

    let nonce = Nonce::from_slice(&nonce);

    let ciphertext = &decoded_ciphertext[12..];

    let decrypted_bytes = cipher
        .decrypt(nonce, ciphertext)
        .expect("Failed to decrypt data");

    let plaintext =
        std::str::from_utf8(&decrypted_bytes).expect("Failed to convert byte array to string");

    Ok(plaintext.to_string())
}

fn get_key_bytes(key_str: &str) -> [u8; 32] {
    let mut key = [0; 32];

    let len = key_str.as_bytes().len().min(32);

    key[..len].copy_from_slice(&key_str.as_bytes()[..len]);

    key
}
