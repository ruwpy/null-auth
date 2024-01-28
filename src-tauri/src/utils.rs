use sha2::{Digest, Sha256};

// TODO: hash key

pub fn get_key_bytes(key_str: String) -> [u8; 32] {
    let mut key = [0; 32];

    let mut hasher = Sha256::new();

    hasher.update(key_str.as_bytes());

    key.copy_from_slice(hasher.finalize().as_slice());

    key
}
