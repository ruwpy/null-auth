import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./otp.module.scss";
import { IOtp } from "@/types";
import { useContextProvider } from "@/hooks/useContextProvider";
import { useEffect, useState } from "react";
import { ButtonMore } from "@/components/buttonMore";
import { generateTotp } from "@/lib/commands";
import { cn, writeToClipboard } from "@/lib/utils";
import { CenterModal } from "@/components/modals/modal-center/modal-center";
import { ModalProps } from "@/components/modals/modal-wrapper/modal-wrapper";
import { AnimatePresence } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { ImportImageButton } from "@/components/otp/buttons-import/button-import-image";
import QrScanner from "qr-scanner";
import { invoke } from "@tauri-apps/api";
import { store } from "@/store";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { createFileRoute } from "@tanstack/react-router";

export const OtpPage = () => {
  const data = useContextProvider();
  const [otps, setOtps] = useState<IOtp[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [isExportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    if (data.otpAccounts) {
      setOtps(data.otpAccounts);
    }
  }, [data.otpAccounts]);

  useEffect(() => {
    if (data.otpAccounts) {
      const otpAccounts = data.otpAccounts.filter((p) =>
        p.issuer.toLowerCase().includes(searchInputValue.toLowerCase())
      );

      setOtps(otpAccounts);
    }
  }, [searchInputValue]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topPart}>
          <h1>2FA OTP</h1>
          <div className={styles.buttons}>
            <Input
              onChange={(e) => setSearchInputValue(e.target.value)}
              value={searchInputValue}
              placeholder="Find account"
            />
            <Button onClick={() => setImportModalOpen((prev) => !prev)}>Import account</Button>
            <Button onClick={() => setExportModalOpen((prev) => !prev)}>Export account</Button>
          </div>
        </div>
        <div className={styles.otpContainer}>
          {otps && otps.map((otp) => <Otp key={otp.id} {...otp} />)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isImportModalOpen && (
          <ImportOTPModal modalOpen={isImportModalOpen} setModalOpen={setImportModalOpen} />
        )}
      </AnimatePresence>
    </>
  );
};

const Otp = ({ issuer, secret, name, code }: IOtp) => {
  const splitCode = (code: string) => {
    return `${code.substring(0, 3)} ${code.substring(3, 6)}`;
  };

  return (
    <div className={styles.otp}>
      <div className={styles.otpData}>
        <span onClick={() => writeToClipboard(code || "000000")} className={styles.code}>
          {splitCode(code || "000000")}
        </span>
        <div className={styles.data}>
          <span className={styles.issuer}>{issuer}</span>
          <span>·</span>
          <span className={styles.name}>{name}</span>
        </div>
      </div>
      <ButtonMore />
    </div>
  );
};

const ImportOTPModal = ({ modalOpen, setModalOpen }: ModalProps) => {
  const { passphrase } = useContextProvider();

  const importImage = async (file: File) => {
    try {
      let accountsImported: number = 0;

      if (file) {
        const { data } = await QrScanner.scanImage(file, {
          returnDetailedScanResult: true,
          alsoTryWithoutScanRegion: true,
        });

        if (data.startsWith("otpauth-migration://")) {
          const accounts = (await invoke("parse_data_from_uri", {
            uri: data,
          })) as IOtp[];

          for (const account of accounts) {
            await store.addElement("otps", { ...account, id: nanoid() }, passphrase);

            accountsImported += 1;
          }
        }

        if (data.startsWith("otpauth://")) {
          const url = new URL(data);
          const name = url.pathname.split("/")[3];
          const params = Object.fromEntries(url.searchParams) as {
            issuer: string;
            secret: string;
          };
          await store.addElement("otps", { ...params, name, id: nanoid() }, passphrase);
        }
      }
      toast.success(`${accountsImported ?? 1} accounts were imported`);

      accountsImported = 0;
    } catch (error) {
      console.log(error);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div>
      <CenterModal
        title="Import accounts"
        description="select a preferable method to import accounts"
        {...{ modalOpen, setModalOpen }}
      >
        <div className={styles.availableImportMethods}>
          <Button variant="blank" className={styles.importMethodButton}>
            <Icons.add width={32} height={32} />
            <span>Create manually</span>
          </Button>
          <ImportImageButton importFn={importImage} />
          <Button variant="blank" disabled className={styles.importMethodButton}>
            <Icons.screenshot width={32} height={32} />
            <span>Take a screenshot</span>
          </Button>
        </div>
      </CenterModal>
    </div>
  );
};

export const Route = createFileRoute("/otp")({
  component: OtpPage,
});
