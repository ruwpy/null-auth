import { Accounts } from "../../components/accounts";
import { Sidebar } from "@/components/sidebar";

export const MainPage = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="mt-[30px] w-full bg-white px-[20px]">
        <Accounts />
      </div>
    </div>
  );
};
