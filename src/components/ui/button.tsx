import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  "w-fit flex justify-center items-center gap-[10px] px-[15px] disabled:opacity-60 disabled:cursor-not-allowed py-[8px] rounded-[10px] transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-900 hover:bg-neutral-800 disabled:hover:bg-neutral-900 text-white",
        secondary:
          "bg-white hover:bg-slate-50 disabled:hover:bg-slate-50 text-neutral-900  border border-black/5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = ({ variant, className, ...props }: ButtonProps) => {
  return <button className={cn(button({ variant, className }))} {...props} />;
};
