import { useZustandStore } from "@/store/useZustandStore";
import { invoke } from "@tauri-apps/api";

export const hashString = async (str: string): Promise<string> => {
  return invoke("hash_string", { str });
};

export const encryptString = async (str: string, passphrase: string): Promise<string> => {
  return invoke("encrypt_string", { str, passphrase });
};

export const decryptString = async (
  encryptedStr: string,
  passphrase: string
): Promise<string> => {
  return invoke("decrypt_string", { encryptedStr, passphrase });
};
