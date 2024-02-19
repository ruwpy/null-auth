import { constants } from "@/lib/constants";
import { Icons } from "../icons/icons";
import styles from "./button-dropdown.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { animations } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Button } from "../button/button";
import { nanoid } from "nanoid";

type Directions = "top" | "right" | "bottom" | "left";

export interface IDropdownButtonProps {
  options: {
    icon?: React.ReactElement;
    title: string;
    fn: (...props: any[]) => void;
  }[];
}

export const DropdownButton = ({ options }: IDropdownButtonProps) => {
  if (!options) return;

  const [isOpened, setOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpened((prev) => !prev);
  };

  // calculating the perfect display position so the menu doesn't overflow of the window
  useEffect(() => {
    if (isOpened) {
      document.body.style.pointerEvents = "none";

      if (!menuRef.current) return;

      const menuEl = menuRef.current;

      const overflows: { [key in Directions]: { overflowing: boolean; opposite: Directions } } = {
        top: { overflowing: false, opposite: "bottom" },
        bottom: { overflowing: false, opposite: "top" },
        right: { overflowing: false, opposite: "left" },
        left: { overflowing: false, opposite: "right" },
      };

      if (menuEl.getBoundingClientRect().top < 0 + 20) {
        overflows.top.overflowing = true;
        menuEl.style.inset = "inherit";
      }

      if (menuEl.getBoundingClientRect().right > 785.6 - 20) {
        overflows.right.overflowing = true;
        menuEl.style.inset = "inherit";
      }

      if (menuEl.getBoundingClientRect().bottom > 500 - 20) {
        overflows.bottom.overflowing = true;
        menuEl.style.inset = "inherit";
      }

      if (menuEl.getBoundingClientRect().left < 0 + 20) {
        overflows.left.overflowing = true;
        menuEl.style.inset = "inherit";
      }

      let key: Directions;

      console.log(overflows);

      for (key in overflows) {
        const direction = overflows[key];

        if (direction.overflowing) {
          if (!overflows[direction.opposite].overflowing) {
            menuEl.style[direction.opposite] = "unset";
            menuEl.style[key] = "40px";
          }

          if (key === "right" || key === "left") {
            if (overflows.top.overflowing) menuEl.style.top = "0";
            if (overflows.bottom.overflowing) menuEl.style.bottom = "0";
          }
        }
      }
    }

    document.body.style.pointerEvents = "initial";
  }, [isOpened]);

  return (
    <div className={styles.dropdown}>
      {isOpened && <div onClick={toggleMenu} className={styles.backdrop}></div>}

      <Button
        variant="blank"
        onClick={toggleMenu}
        className={cn(styles.dropdownButton, isOpened && styles.opened)}
      >
        <Icons.more width={24} height={24} color={constants.colors.accent} />
      </Button>
      <AnimatePresence mode="wait">
        {isOpened &&
          options.map((o) => {
            return (
              <m.div key={nanoid()} ref={menuRef} {...animations.enter} className={styles.menu}>
                <div onClick={o.fn} className={styles.option}>
                  {o.icon}
                  <span>{o.title}</span>
                </div>
              </m.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
};
