import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-neutral-900 hover:bg-neutral-800 text-white w-fit px-[15px] py-[8px] rounded-[10px]",
        className
      )}
      {...props}
    />
  );
};
