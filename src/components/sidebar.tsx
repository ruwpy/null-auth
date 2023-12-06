import { useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { Link } from "react-router-dom";
import { Variants, motion as m } from "framer-motion";

const sidebarImportExportAnimation: Variants = {
  initial: { maxHeight: "0px" },
  animate: { maxHeight: "95px" },
};

export const Sidebar = () => {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between px-[6px] py-[10px] border-r border-black/10 mt-[30px]">
      <div className="flex flex-col items-center gap-[5px] w-full">
        <Link to="/accounts">
          <Button className=" p-[10px] rounded-[10px]">
            <Icons.list className="text-white" />
          </Button>
        </Link>
        <Link to="/newaccount">
          <Button className=" p-[10px] rounded-[10px]">
            <Icons.plus className="text-white" />
          </Button>
        </Link>
        <div className="relative bg-neutral-900 rounded-[10px]">
          <Button
            onClick={() => setQrOpen((prev) => !prev)}
            className=" p-[10px] rounded-[10px]"
          >
            <Icons.qr className="text-white" />
          </Button>
          <m.div
            variants={sidebarImportExportAnimation}
            animate={qrOpen ? "animate" : "initial"}
            initial="initial"
            transition={{ duration: 0.15 }}
            className="overflow-hidden rounded-[10px] flex flex-col"
          >
            <Link to="/import">
              <Button className="p-[10px] mt-[5px] rounded-[10px]">
                <Icons.import className="text-white" />
              </Button>
            </Link>
            <Link to="/export">
              <Button className="p-[10px] mt-[5px] rounded-[10px]">
                <Icons.export className="text-white" />
              </Button>
            </Link>
          </m.div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-end items-center gap-[5px] w-full">
        <Link to="/settings">
          <Button className=" p-[10px] rounded-[10px]">
            <Icons.settings className="text-white" />
          </Button>
        </Link>
      </div> */}
    </div>
  );
};
