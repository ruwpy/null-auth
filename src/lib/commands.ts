import { invoke } from "@tauri-apps/api";

export const hashPassword = async (password: string): Promise<string> => {
  const hash = (await invoke("hash_password", { password })) as string;
  return hash;
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const verified = (await invoke("verify_password", { password, hash })) as boolean;
  return verified;
};

export const encryptString = async (str: string, key: string): Promise<string> => {
  const encryptedStr = (await invoke("encode_string", { str, key })) as string;
  return encryptedStr;
};

export const decryptString = async (str: string, key: string): Promise<string> => {
  const decryptedStr = (await invoke("decode_string", { str, key })) as string;
  return decryptedStr;
};
