import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./passwords.module.scss";
import { ButtonMore } from "@/components/buttonMore";
import { useContextProvider } from "@/hooks/useContextProvider";
import { IPassword } from "@/types";
import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { constants } from "@/lib/constants";
import { writeToClipboard } from "@/lib/utils";
import { SideModal } from "@/components/modals/modal-side/modal-side";
import { AnimatePresence } from "framer-motion";
import { ModalProps } from "@/components/modals/modal-wrapper/modal-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nanoid } from "nanoid";
import { store } from "@/store";
import { createFileRoute } from "@tanstack/react-router";

const AccountFormSchema = z
  .object({
    serviceName: z.string().min(1),
    email: z.string().email(),
    login: z.string().min(4),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

type AccountDataType = z.infer<typeof AccountFormSchema>;

export const PasswordsPage = () => {
  const data = useContextProvider();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data.passwords) {
      setPasswords(data.passwords);
    }
  }, [data.passwords]);

  useEffect(() => {
    if (data.passwords) {
      const passwords = data.passwords.filter((p) =>
        p.issuerService.toLowerCase().includes(searchInputValue.toLowerCase())
      );

      setPasswords(passwords);
    }
  }, [searchInputValue]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topPart}>
          <h1>Passwords</h1>
          <div className={styles.buttons}>
            <Input
              onChange={(e) => setSearchInputValue(e.target.value)}
              value={searchInputValue}
              placeholder="Find password"
            />
            <Button onClick={() => setModalOpen(true)}>Add account</Button>
          </div>
        </div>
        <div className={styles.passwordsContainer}>
          {passwords ? passwords.map((p) => <Password key={p.id} {...p} />) : null}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {modalOpen && <AddPasswordModal {...{ modalOpen, setModalOpen }} />}
      </AnimatePresence>
    </>
  );
};

const Password = ({ email, login, password, issuerService }: IPassword) => {
  const [isOpened, setOpened] = useState(false);

  return (
    <div onClick={() => setOpened((prev) => !prev)} className={styles.password}>
      <div className={styles.passwordPreview}>
        <div className={styles.passwordData}>
          <div className={styles.serviceData}>
            {/* TODO!!!  */}
            <div className={styles.logo}></div>
            {/* need to find all the possible logos and add it as svg */}
            <span className={styles.serviceName}>{issuerService}</span>
          </div>
          <span className={styles.login}>{email ?? login}</span>
        </div>
        <ButtonMore />
      </div>
      {isOpened && (
        <div className={styles.hiddenData}>
          <div className={styles.horizontalData}>
            <div className={styles.verticalData}>
              {email && <PasswordDataField data={email} placeholder="Email:" />}
              {login && <PasswordDataField data={login} placeholder="Login:" />}
            </div>
            <PasswordDataField data={password} placeholder="Password:" />
          </div>
        </div>
      )}
    </div>
  );
};

const PasswordDataField = ({ placeholder, data }: { placeholder: string; data: string }) => {
  const copyData = (e: React.MouseEvent, data: string) => {
    e.stopPropagation();
    writeToClipboard(data);
  };

  return (
    <div onClick={(e) => copyData(e, data)} className={styles.dataContainer}>
      <span>
        <span className={styles.dataPlaceholder}>{placeholder}</span>
        <span>{data}</span>
      </span>
      <Icons.copy color={constants.colors.halfTransparentBlack} width={20} height={20} />
    </div>
  );
};

const AddPasswordModal = ({ modalOpen, setModalOpen }: ModalProps) => {
  const { passphrase, setPasswords } = useContextProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDataType>({
    resolver: zodResolver(AccountFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { password, email, login, serviceName } = data;

    const account: IPassword = {
      email,
      login,
      password,
      issuerService: serviceName,
      id: nanoid(),
    };

    try {
      await store.addElement("passwords", account, passphrase);
      setPasswords((prev) => [...(prev || []), account]);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <SideModal
      title="Add account"
      description="Account must have either email or login"
      {...{ modalOpen, setModalOpen }}
    >
      <form onSubmit={onSubmit} className={styles.modalForm}>
        <Input placeholder="Service name" {...register("serviceName")} />
        <Input placeholder="Email" {...register("email")} />
        <Input placeholder="Login" {...register("login")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        <Input placeholder="Confirm password" type="password" {...register("confirmPassword")} />
        <div className={styles.modalButton}>
          <Button>Save account</Button>
        </div>
      </form>
    </SideModal>
  );
};

export const Route = createFileRoute("/passwords")({
  component: PasswordsPage,
});
