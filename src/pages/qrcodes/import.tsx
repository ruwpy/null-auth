import { invoke } from "@tauri-apps/api";
import QrScanner from "qr-scanner";
import { ElementRef, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContextProvider } from "@/hooks/useContextProvider";
import { addAccount } from "@/store/actions";
import { IAccount } from "@/types";
// import { encryptString } from "@/lib/rustFunctions";
// import { useScanner } from "@/hooks/useScanner";
// import { Modal } from "@/components/modals/modal";

export const ImportPage = () => {
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const { hasCamera, scanner, isScanning, startScan, stopScan } = useScanner(
  //   videoRef.current,
  //   (res) => console.log(res)
  // );

  // const {getInputProps,getRootProps,} = useDropzone()
  const navigate = useNavigate();
  const inputRef = useRef<ElementRef<"input">>(null);
  const { passphrase, setAccounts } = useContextProvider();
  const onUpload = async (file: File | null) => {
    try {
      let QRCodesImported: number = 0;
      if (file) {
        const { data } = await QrScanner.scanImage(file, {
          returnDetailedScanResult: true,
          alsoTryWithoutScanRegion: true,
        });

        if (data.startsWith("otpauth-migration://")) {
          const accounts = (await invoke("parse_data_from_uri", {
            uri: data,
          })) as IAccount[];

          for (const account of accounts) {
            try {
              const secret = await addAccount({ account, passphrase });
              if (secret) setAccounts((prev) => [...prev, { ...account, secret }]);

              QRCodesImported += 1;
            } catch (error) {
              console.log(error);
            }
          }
        } else if (data.startsWith("otpauth://")) {
          const url = new URL(data);
          const name = url.pathname.split("/")[3];
          const params = Object.fromEntries(url.searchParams) as {
            issuer: string;
            secret: string;
          };
          const secret = await addAccount({ account: { name, ...params }, passphrase });
          if (secret)
            setAccounts((prev) => [...prev, { name, secret, issuer: params.issuer }]);
        }
      }
      navigate("/accounts");
      toast.success(`${QRCodesImported ?? 1} accounts were imported`);
      QRCodesImported = 0;
    } catch (error) {
      console.log(error);
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-[5px] p-[20px]">
        {/* <FileUploader
          handleChange={onUpload}
          name="file"
          className="w-full aspect-square px-[55px] text-center transition-colors text-black/50 border-[3px] border-dashed border-black/20 flex flex-col gap-[15px] justify-center items-center rounded-[10px]"
        >
          <div className="flex flex-col items-center">
            <Icons.image width={30} height={30} className="text-[rgb(180,180,180)]" />
            Drop image with QR code here
          </div>
          or click here to select
          </label>
        </FileUploader> */}
        <label
          className="bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer flex justify-center items-center gap-[10px] px-[15px] disabled:opacity-50 disabled:cursor-not-allowed py-[8px] rounded-[10px] transition-colors"
          htmlFor="imageUpload"
        >
          Scan QR code from image
        </label>
        <Input
          onChange={(e) => onUpload(e.target.files && (e.target.files[0] ?? null))}
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
        />
      </div>
      {/* <div className="relative rounded-[10px] overflow-hidden">
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
      </div> */}
    </div>
  );
};
