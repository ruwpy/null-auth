import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useContextProvider } from "@/hooks/useContextProvider";
import { verifyPassword } from "@/lib/commands";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import styles from "./vault.module.scss";

const AuthFormSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterDataType = z.infer<typeof AuthFormSchema>;

export const VaultAuthenticatePage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterDataType>({ resolver: zodResolver(AuthFormSchema) });

  const { hashedPassphrase, setPassphrase } = useContextProvider();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const isVerified = await verifyPassword(data.password, hashedPassphrase);
      if (!isVerified) return setError("password", { message: "Incorrect password" });

      toast.success("Authenticated");
      setPassphrase(data.password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className={styles.vault}>
      <h1 className={styles.heading}>Welcome back!</h1>
      <span>enter your password below to login</span>
      <form onSubmit={onSubmit} className={styles.form}>
        <span className={styles.error}>{errors.password && errors.password.message}</span>
        <Input error={errors.password?.message} placeholder="Password" type="password" {...register("password")} />
        <Button disabled={isLoading} className={styles.submitButton} width="full">
          {isLoading && <Icons.loading width={15} height={15} className="animate-spin" />}
          Confirm
        </Button>
      </form>
    </div>
  );
};
