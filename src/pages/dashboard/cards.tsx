import { Button } from "@/components/ui/button";
import styles from "./cards.module.scss";
import { ICard } from "@/types";
import { nanoid } from "nanoid";
import { useState } from "react";

interface ICardGroup {
  id: string;
  groupName: string;
  cards: ICard[];
}

export const CardsPage = () => {
  const cards: ICard[] = [
    {
      cardHolder: "DMITRII BALIANOV",
      cardNumber: 4123456789124567,
      cvv: 123,
      date: new Date(),
      id: nanoid(),
    },
    {
      cardHolder: "DMITRII BALIANOV",
      cardNumber: 4123456789124567,
      cvv: 123,
      date: new Date(),
      id: nanoid(),
    },
  ];

  const cartGroups: ICardGroup[] = [
    {
      cards: cards,
      groupName: "Debit cards",
      id: nanoid(),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topPart}>
        <h1>Cards</h1>
        <div className={styles.buttons}>
          <Button>Create group</Button>
          <Button>Add card</Button>
        </div>
      </div>
      <div className={styles.cardGroupContainer}>
        {cartGroups.map((g) => (
          <CardGroup key={g.id} {...g} />
        ))}
      </div>
    </div>
  );
};

const CardGroup = ({ cards, groupName }: ICardGroup) => {
  return (
    <div className={styles.cardGroup}>
      <h2>{groupName}</h2>
      <div>
        {cards.map((c) => (
          <Card key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ cardHolder, cardNumber, cvv, date }: ICard) => {
  const [isCardShowed, setCardShowed] = useState(false);

  if (isCardShowed) {
    return (
      <div className={styles.card}>
        <div></div>
        <span></span>
        <Button></Button>
      </div>
    );
  } else {
    return <div></div>;
  }
};
