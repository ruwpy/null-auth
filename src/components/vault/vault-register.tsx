import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { useContextProvider } from "@/hooks/useContextProvider";
import { hashPassword } from "@/lib/commands";
import { store } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./vault.module.scss";
import { useState } from "react";
import { Icons } from "@/components/ui/icons/icons";

const RegisterFormSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

type RegisterDataType = z.infer<typeof RegisterFormSchema>;

export const VaultRegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({ resolver: zodResolver(RegisterFormSchema) });

  const { setPassphrase, setHashedPassphrase } = useContextProvider();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const { password } = data;

      const hashedPassword = await hashPassword(password);

      setHashedPassphrase(hashedPassword);
      setPassphrase(password);

      await store.setPassphrase(hashedPassword);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  console.log(isLoading);

  return (
    <div className={styles.vault}>
      <h1 className={styles.heading}>Welcome to null-auth</h1>
      <span>enter your password to create your local account</span>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          error={errors.password?.message}
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <Input
          error={errors.confirmPassword?.message}
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword")}
        />
        <Button disabled={isLoading} className={styles.submitButton} width="full">
          {isLoading && <Icons.loading width={15} height={15} className="animate-spin" />}
          Confirm
        </Button>
      </form>
    </div>
  );
};
