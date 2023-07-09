import { invoke } from "@tauri-apps/api";
import { store } from "../store/localStore";

export const hashString = async (str: string): Promise<string> => {
  return invoke("hash_string", { str });
};

export const encryptString = async (str: string): Promise<string> => {
  const passphrase: string | null = await store.get("passphrase");
  return invoke("encrypt_string", { str, passphrase });
};

export const decryptString = async (encryptedStr: string): Promise<string> => {
  const passphrase: string | null = await store.get("passphrase");
  console.log(passphrase);

  return invoke("decrypt_string", { encryptedStr, passphrase });
};
