import { invoke } from "@tauri-apps/api";
import { Button } from "@/components/ui/button";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { useScanner } from "@/hooks/useScanner";
import { Modal } from "@/components/modal";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { IAccount } from "@/types";
import { useZustandStore } from "@/store/useZustandStore";

export const ImportPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { passphrase, addAccount } = useZustandStore();
  const { hasCamera, scanner, isScanning, startScan, stopScan } = useScanner(
    videoRef.current,
    (res) => console.log(res)
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    try {
      if (e.target.files) {
        const { data } = await QrScanner.scanImage(e.target.files[0], {
          returnDetailedScanResult: true,
          alsoTryWithoutScanRegion: true,
        });

        const accounts = (await invoke("parse_data_from_uri", {
          uri: data,
        })) as IAccount[];

        for (const account of accounts) {
          await addAccount(account, passphrase);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-[5px] mt-[10px]">
        <label
          htmlFor="imageUpload"
          className="w-full bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer text-white py-[8px] flex justify-center items-center rounded-[10px]"
        >
          Scan QR code from image
        </label>
        <Input
          ref={fileRef}
          onChange={(e) => onUpload(e)}
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
        />
        <Button onClick={() => startScan()} disabled={!hasCamera} className="w-full">
          Scan QR code from camera
        </Button>
      </div>
      <div className="relative rounded-[10px] overflow-hidden">
        <video
          ref={videoRef}
          className={`w-full h-[200px] object-cover ${
            isScanning ? "bg-neutral-900" : ""
          }`}
        ></video>
        {isScanning && (
          <Button
            variant={"secondary"}
            onClick={() => stopScan()}
            className="absolute w-[40px] h-[40px] p-0 top-[10px] right-[10px]"
          >
            <Icons.close />
          </Button>
        )}
      </div>
    </div>
  );
};
