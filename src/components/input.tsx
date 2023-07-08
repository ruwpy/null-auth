import { forwardRef } from "react";
import { cn } from "../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "w-full outline-none rounded-[5px] px-[15px] py-[10px] text-lightBeige outline-black/5 focus:ring-2 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
