import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContextProvider } from "@/hooks/useContextProvider";
import { hashPassword } from "@/lib/commands";
import { store } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./vault.module.scss";

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

  const onSubmit = handleSubmit(async (data) => {
    const { password } = data;

    const hashedPassword = await hashPassword(password);

    setHashedPassphrase(hashedPassword);
    setPassphrase(password);

    await store.setPassphrase(hashedPassword);
  });

  return (
    <div className={styles.vault}>
      <h1>Welcome to null-auth</h1>
      <span>set a password for further access to the application</span>
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
        <Button className={styles.submitButton} width="full">
          Confirm
        </Button>
      </form>
    </div>
  );
};
