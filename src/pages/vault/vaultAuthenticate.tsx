import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useContextProvider } from "@/hooks/useContextProvider";
import { verifyHash } from "@/lib/rustFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const RegisterFormSchema = z.object({
  password: z.string().min(6),
});

type RegisterDataType = z.infer<typeof RegisterFormSchema>;

export const VaultAuthenticatePage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterDataType>({ resolver: zodResolver(RegisterFormSchema) });
  const { passphrase, setAuthenticated } = useContextProvider();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const isCorrect = await verifyHash(data.password, passphrase);
      if (!isCorrect) return setError("password", { message: "Incorrect password" });

      toast.success("Authenticated");
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex flex-col items-center relative mt-[150px] w-full bg-white px-[20px]">
      <img src="/nullauth.svg" alt="null-auth logo" />
      <h1 className="mt-[10px]">Welcome back!</h1>
      <span className="text-center max-w-[300px]">
        to get into application you have to enter the password
      </span>
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
        <Button disabled={isLoading} className="w-full mt-[20px]">
          {isLoading && <Icons.loading width={15} height={15} className="animate-spin" />}
          Confirm
        </Button>
      </form>
    </div>
  );
};
