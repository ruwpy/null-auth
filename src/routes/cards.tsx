import { Button } from "@/components/ui/button";
import styles from "./cards.module.scss";
import { ICard } from "@/types";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { constants } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ButtonMore } from "@/components/buttonMore";
import { createFileRoute } from "@tanstack/react-router";

interface ICardGroup {
  id: string;
  groupName: string;
  cards: ICard[];
}

export const CardsPage = () => {
  const cards: ICard[] = [
    {
      issuerBank: "visa",
      cardHolder: "DMITRII BALIANOV",
      cardNumber: "4123456789124567",
      cvv: 123,
      date: new Date(),
      id: nanoid(),
    },
    {
      issuerBank: "mir",
      cardHolder: "DMITRII BALIANOV",
      cardNumber: "412345678912345678",
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
          <Button>Add card</Button>
        </div>
      </div>
      <div className={styles.groupContainer}>
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
      <h2 className={styles.cardGroupNameHeading}>{groupName}</h2>
      <div className={styles.cardsContainer}>
        {cards.map((c) => (
          <Card key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ issuerBank, cardHolder, cardNumber, cvv, date }: ICard) => {
  const [isCardShowed, setCardShowed] = useState(false);

  const copy = (event: React.MouseEvent, str: string) => {
    event.stopPropagation();
    navigator.clipboard.writeText(str);
  };

  const getCardExpireDate = (date: Date) => {
    const month = date.getMonth();
    const day = date.getDate();

    return `${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}`;
  };

  const splittedCardNumber = useMemo(() => {
    const result: string[] = [];

    for (let i = 0; i < cardNumber.length / 4; i++) {
      result.push(cardNumber.substring(i * 4, i * 4 + 4));
    }

    return `${result.join(" ")}`;
  }, [cardNumber]);

  const BankLogo = Icons.cardTypes[issuerBank];

  useEffect(() => {
    if (isCardShowed) {
      const timeout = setTimeout(() => {
        setCardShowed(false);
      }, 60000);

      return () => clearTimeout(timeout);
    }
  }, [isCardShowed]);

  return (
    <div className={styles.card} onClick={() => setCardShowed((prev) => !prev)}>
      {isCardShowed ? (
        <>
          <div className={styles.mainCardData}>
            <div
              onClick={(e) => copy(e, splittedCardNumber)}
              className={cn(styles.cardDataContainer, styles.cardNumber)}
            >
              {splittedCardNumber}
              <Icons.copy color={constants.colors.accent} width={20} height={20} />
            </div>
            <div className={styles.cvvContainer}>
              <div onClick={(e) => copy(e, cvv.toString())} className={styles.cardDataContainer}>
                {cvv.toString()}
                <Icons.copy color={constants.colors.accent} width={20} height={20} />
              </div>
              <span>This is your CVV/CVC code</span>
            </div>
          </div>
          <div className={styles.otherCardData}>
            <span className={styles.holder}>
              Holder{" "}
              <span onClick={(e) => copy(e, cardHolder)} className={styles.textAccent}>
                {cardHolder}
              </span>
            </span>
            <span className={styles.expires}>
              Available until{" "}
              <span onClick={(e) => copy(e, getCardExpireDate(date))} className={styles.textAccent}>
                {getCardExpireDate(date)}
              </span>
            </span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.topPart}>
            <BankLogo />
            <ButtonMore />
          </div>
          <span className={styles.hiddenCardNumber}>
            **** {cardNumber.substring(cardNumber.toString().length - 4)}
          </span>
        </>
      )}
    </div>
  );
};

const AddCardModal = () => {};

export const Route = createFileRoute("/cards")({
  component: CardsPage,
});
