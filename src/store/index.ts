import { decryptString, encryptString } from "@/lib/commands";
import { ICard, IOtp, IPassword } from "@/types";
import { Store } from "tauri-plugin-store-api";

export interface IData {
  passwords: IPassword[];
  cards: ICard[];
  otps: IOtp[];
}

export type TDataKeys = keyof IData & string;

const createStore = () => {
  const store = new Store(".localdata.dat");

  const getPassphrase = async () => {
    const hashedPassphrase = (await store.get("passphrase")) as string;
    return hashedPassphrase;
  };

  const setPassphrase = async (hashedPassphrase: string) => {
    await store.set("passphrase", hashedPassphrase);
    await store.save();
  };

  const getData = async <K extends TDataKeys>(key: K, passphrase: string) => {
    const encryptedData = (await store.get(key)) as string;

    if (encryptedData) {
      const decryptedData = await decryptString(encryptedData, passphrase);

      const data = JSON.parse(decryptedData) as IData[K] | undefined;

      return data;
    }
  };

  const setData = async <K extends TDataKeys>(
    key: K,
    data: IData[K],
    passphrase: string
  ) => {
    const encryptedData = await encryptString(JSON.stringify(data), passphrase);

    await store.set(key, encryptedData);
    await store.save();
  };

  const addElement = async <K extends TDataKeys>(
    key: K,
    element: IData[K][number],
    passphrase: string
  ) => {
    const data = (await store.get(key)) as IData[K];

    const appendedArray = [...(data || []), element] as IData[K];

    await setData(key, appendedArray, passphrase);
  };

  const removeElement = async <K extends TDataKeys>(
    key: K,
    id: string,
    passphrase: string
  ) => {
    const data = (await store.get(key)) as IData[K];

    const filteredArray = data.filter((el) => el.id !== id) as IData[K];

    await setData(key, filteredArray, passphrase);
  };

  return { getPassphrase, setPassphrase, getData, setData, addElement, removeElement };
};

export const store = createStore();
