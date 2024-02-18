import { ICardType } from "@/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const range = (numOne: number, numTwo?: number) => {
  const start = numTwo ? numOne : 0;
  const end = numTwo ?? numOne;

  const resultArray: number[] = [];

  for (let i = start; i <= end; i++) {
    resultArray.push(i);
  }

  return resultArray;
};

const cardTypes: ICardType[] = [
  {
    name: "amex",
    range: [34, 37],
    validLength: [15],
  },
  {
    name: "diners_club_international",
    range: [3095, 36, 38, 39, ...range(300, 305)],
    validLength: range(14, 19),
  },
  {
    name: "jcb",
    range: [
      ...range(3088, 3094),
      ...range(3096, 3102),
      ...range(3112, 3120),
      ...range(3158, 3159),
      ...range(3337, 3349),
      ...range(3528, 3589),
    ],
    validLength: [16],
  },
  {
    name: "visa_electron",
    range: [4026, 417500, 4508, 4844, 4913, 4917],
    validLength: [16],
  },
  {
    name: "visa",
    range: [4],
    validLength: [13, 14, 15, 16, 17, 18, 19],
  },
  {
    name: "mastercard",
    range: [...range(51, 55), ...range(2221, 2720)],
    validLength: [16],
  },
  {
    name: "discover",
    range: [6011, ...range(622126, 622925), ...range(644, 649), 65],
    validLength: [16, 17, 18, 19],
  },
  {
    name: "dankort",
    range: [5019],
    validLength: [16],
  },
  {
    name: "maestro",
    range: [50, ...range(56, 69)],
    validLength: [12, 13, 14, 15, 16, 17, 18, 19],
  },
  {
    name: "mir",
    range: [2200, 2204],
    validLength: [16],
  },
];

// TODO: I feel like this function could be optimized
export const validateCard = (cardNumber: string) => {
  for (const cardType of cardTypes) {
    for (const num of cardType.range) {
      if (cardNumber.startsWith(num.toString()))
        return { name: cardType.name, length: cardType.validLength };
    }
  }
};

export const writeToClipboard = (str: string) => {
  navigator.clipboard.writeText(str);
};

export const compareObjects = <T extends { [key: string]: any }>(
  a: T,
  b: T,
  ignoredKeys?: string[]
): boolean => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (keysB.indexOf(key) < 0) {
      return false;
    }

    const valueA = a[key];
    const valueB = b[key];

    if (ignoredKeys && ignoredKeys.indexOf(key) < 0) continue;

    if (typeof valueA === "object" && typeof valueB === "object") {
      if (!compareObjects(valueA, valueB)) {
        return false;
      }
    } else if (valueA !== valueB) {
      return false;
    }
  }

  return true;
};
