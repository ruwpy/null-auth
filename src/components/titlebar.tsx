import { createPortal } from "react-dom";
import { Icons } from "./ui/icons";
import { appWindow } from "@tauri-apps/api/window";

export const Titlebar = () => {
  return createPortal(
    <>
      <span className="flex font-sans items-center gap-[5px] pointer-events-none ml-[10px] text-neutral-900 text-[14px] font-medium">
        <Icons.nullauth width={15} height={15} />
        <span>null-auth</span>
      </span>
      <div className="flex">
        <div
          onClick={() => appWindow.minimize()}
          className="hover:bg-black/10 active:bg-black/20 h-[30px] w-[30px] flex justify-center items-center"
        >
          <Icons.minimize className="text-neutral-900" width={20} height={20} />
        </div>
        <div
          onClick={() => appWindow.close()}
          className="hover:bg-black/10 active:bg-black/20 h-[30px] w-[30px] flex justify-center items-center"
        >
          <Icons.close className="text-neutral-900" width={20} height={20} />
        </div>
      </div>
    </>,
    document.querySelector("#titlebar") as HTMLElement
  );
};
