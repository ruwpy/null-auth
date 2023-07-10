import { invoke } from "@tauri-apps/api";
import { store } from "../store/localStore";

export const hashString = async (str: string): Promise<string> => {
  return invoke("hash_string", { str });
};

export const encryptString = async (
  str: string,
  passphraseKey: string
): Promise<string> => {
  const passphrase: string | null = await store.get(passphraseKey);
  return invoke("encrypt_string", { str, passphrase });
};

export const decryptString = async (
  encryptedStr: string,
  passphraseKey: string
): Promise<string> => {
  const passphrase: string | null = await store.get(passphraseKey);
  return invoke("decrypt_string", { encryptedStr, passphrase });
};
