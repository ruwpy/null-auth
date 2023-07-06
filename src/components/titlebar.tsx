import { createPortal } from "react-dom";
import { Icons } from "./icons";
import { appWindow } from "@tauri-apps/api/window";

export const Titlebar = () => {
  return createPortal(
    <>
      <span className="pointer-events-none ml-[10px] leading-0 text-neutral-600 text-[14px] font-semibold">
        null-auth
      </span>
      <div className="flex">
        <div
          onClick={() => appWindow.minimize()}
          className="hover:bg-neutral-800 active:bg-neutral-700 h-[30px] w-[30px] flex justify-center items-center"
        >
          <Icons.minimize className="text-neutral-500" width={20} height={20} />
        </div>
        <div
          onClick={() => appWindow.close()}
          className="hover:bg-neutral-800 active:bg-neutral-700 h-[30px] w-[30px] flex justify-center items-center"
        >
          <Icons.close className="text-neutral-500" width={20} height={20} />
        </div>
      </div>
    </>,
    document.querySelector("#titlebar") as HTMLElement
  );
};
