import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hashString } from "@/lib/rustFunctions";
import { store } from "@/store/localStore";
import { useZustandStore } from "@/store/useZustandStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const { setPassphrase } = useZustandStore();
  const onSubmit = handleSubmit(async (data) => {
    const { password } = data;
    const hashedPassword = await hashString(password);
    await setPassphrase(hashedPassword);
  });

  return (
    <div className="flex flex-col items-center relative mt-[100px] w-full bg-white px-[20px]">
      <img src="/nullauth.svg" alt="null-auth logo" />
      <h1 className="mt-[10px]">Welcome to null-auth</h1>
      <p className="text-center">to get started you need to set your passcode</p>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-[10px] max-w-[250px] mt-[20px]"
      >
        <Input
          className={errors.password?.message ? "outline-red-500 ring-transparent" : ""}
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <Input
          className={
            errors.confirmPassword?.message ? "outline-red-500 ring-transparent" : ""
          }
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword")}
        />
        <Button className="w-full mt-[20px]">Confirm</Button>
      </form>
    </div>
  );
};
