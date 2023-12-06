import { ICard, IOtp, IPassword } from "@/types";
import { Store } from "tauri-plugin-store-api";

interface Data {
  passwords: IPassword[];
  cards: ICard[];
  otps: IOtp[];
  passphrase: string;
}

type ArrayElement<T extends readonly unknown[]> = T[number];
type DataArrays = {
  [K in keyof Data]: Data[K] extends unknown[] ? K : never;
}[keyof Data];

const createStore = () => {
  const store = new Store(".localdata.dat");

  const getData = async <K extends keyof Data>(key: K) => {
    const data = (await store.get(key)) as Data[K];
    return data;
  };

  const setData = async <K extends keyof Data>(key: K, data: Data[K]) => {
    await store.set(key, data);
    await store.save();
  };

  const addElement = async <K extends DataArrays, E extends ArrayElement<Data[K]>>(
    key: K,
    element: E
  ) => {
    const data = (await store.get(key)) as Data[K];

    await store.set(key, [...data, element]);
    await store.save();
  };

  const removeElement = async <K extends DataArrays>(key: K, id: string) => {
    const data = (await store.get(key)) as Data[K];

    const filteredArray = data.filter((el) => el.id !== id);

    await store.set(key, filteredArray);
    await store.save();
  };

  return { getData, setData, addElement, removeElement };
};

export const store = createStore();
