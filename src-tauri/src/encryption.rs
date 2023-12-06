use bcrypt::{hash, verify, DEFAULT_COST};
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

#[tauri::command]
pub async fn hash_string(str: String) -> String {
    let hashed_string = hash(str, DEFAULT_COST).unwrap();
    hashed_string.into()
}

#[tauri::command]
pub async fn verify_hash(str: String, hash: String) -> bool {
    let is_correct = verify(str, &hash).unwrap();
    is_correct.into()
}

#[tauri::command]
pub async fn encrypt_string(str: String, passphrase: String) -> String {
    let mc = new_magic_crypt!(passphrase, 256);
    let encrypted_string = mc.encrypt_str_to_base64(str);
    encrypted_string.into()
}

#[tauri::command]
pub async fn decrypt_string(encrypted_str: String, passphrase: String) -> String {
    let mc = new_magic_crypt!(passphrase, 256);
    let decrypted_string = mc.decrypt_base64_to_string(encrypted_str).unwrap();
    decrypted_string.into()
}
