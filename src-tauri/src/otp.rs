use hmac::{Hmac, Mac};
use sha1::Sha1;
use sha2::{Sha256, Sha512};
use std::time::{SystemTime, UNIX_EPOCH};

type HmacSha1 = Hmac<Sha1>;
type HmacSha256 = Hmac<Sha256>;
type HmacSha512 = Hmac<Sha512>;

#[derive(Debug)]
pub enum Algorithm {
    SHA1,
    SHA256,
    SHA512,
}

impl std::default::Default for Algorithm {
    fn default() -> Self {
        Algorithm::SHA1
    }
}

impl Algorithm {
    fn hash<D>(mut digest: D, data: &[u8]) -> Vec<u8>
    where
        D: Mac,
    {
        digest.update(data);
        digest.finalize().into_bytes().to_vec()
    }

    fn sign(&self, key: &[u8], data: &[u8]) -> Vec<u8> {
        match self {
            Algorithm::SHA1 => Algorithm::hash(HmacSha1::new_from_slice(key).unwrap(), data),
            Algorithm::SHA256 => Algorithm::hash(HmacSha256::new_from_slice(key).unwrap(), data),
            Algorithm::SHA512 => Algorithm::hash(HmacSha512::new_from_slice(key).unwrap(), data),
        }
    }
}

#[derive(Debug)]
pub struct OTP {
    secret: Vec<u8>,
    digits: usize,
    algorithm: Algorithm,
}

impl OTP {
    pub fn new(secret: String, digits: usize, algorithm: Algorithm) -> Self {
        // TODO: error handling
        let secret = base32::decode(base32::Alphabet::RFC4648 { padding: false }, &secret).unwrap();

        OTP {
            secret,
            digits,
            algorithm,
        }
    }

    pub fn generate_hotp(&self, counter: u64) -> String {
        let counter_bytes = counter.to_be_bytes();

        let hash = self
            .algorithm
            .sign(self.secret.as_slice(), &counter_bytes.as_slice());

        let hash = hash.as_slice();

        let offset = (hash[hash.len() - 1] & 0xF) as usize;

        let binary = (hash[offset] as u32 & 0x7F) << 24
            | (hash[offset + 1] as u32 & 0xff) << 16
            | (hash[offset + 2] as u32 & 0xff) << 8
            | (hash[offset + 3] as u32 & 0xff);

        let otp = binary % 10_u32.pow(self.digits as u32);

        let mut code = otp.to_string();

        while code.len() < self.digits {
            code = format!("0{}", &code);
        }

        code
    }

    pub fn generate_totp(&self, time_step: u8) -> String {
        let current_timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();

        let counter = current_timestamp / (time_step as u64);

        let code = self.generate_hotp(counter);

        code
    }
}
