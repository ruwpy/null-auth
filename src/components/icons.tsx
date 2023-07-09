import { X, Minus, LucideProps, Trash2, Plus, LogOut } from "lucide-react";

export const Icons = {
  logout: LogOut,
  plus: Plus,
  trash: Trash2,
  close: X,
  minimize: Minus,
  nullauth: ({ ...props }: LucideProps) => (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="29" cy="29" r="16" stroke="black" strokeWidth="8" />
      <rect x="25" width="8" height="12" fill="black" />
      <rect x="25" y="46" width="8" height="12" fill="black" />
    </svg>
  ),
};
