import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(styles.input, className, error && styles.error)}
        ref={ref}
        {...props}
      />
    );
  }
);
