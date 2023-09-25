import { invoke } from "@tauri-apps/api";

export const hashString = async (str: string): Promise<string> => {
  return await invoke("hash_string", { str });
};

export const verifyHash = async (str: string, hash: string): Promise<boolean> => {
  return await invoke("verify_hash", { str, hash });
};

export const encryptString = async (str: string, passphrase: string): Promise<string> => {
  return await invoke("encrypt_string", { str, passphrase });
};

export const decryptString = async (
  encryptedStr: string,
  passphrase: string
): Promise<string> => {
  return await invoke("decrypt_string", { encryptedStr, passphrase });
};
