import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";
import React from "react";

const button = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      blank: "",
      dashboardLink: styles.dashboardLink,
    },
    width: {
      fit: "",
      full: styles.fullWidth,
    },
  },
  defaultVariants: {
    variant: "primary",
    width: "fit",
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, width, className, ...props }: ButtonProps, ref) => {
    return <button ref={ref} className={cn(button({ variant, width, className }))} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
