import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";

const button = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
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

export const Button = ({ variant, width, className, ...props }: ButtonProps) => {
  return <button className={cn(button({ variant, width, className }))} {...props} />;
};
