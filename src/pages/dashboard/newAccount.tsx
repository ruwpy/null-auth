import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { encryptString } from "@/lib/rustFunctions";
import { useNavigate } from "react-router-dom";
import { useZustandStore } from "@/store/useZustandStore";

const FormSchema = z.object({
  secret: z.string().min(1, { message: "Required" }),
  username: z.string().min(1, { message: "Required" }),
  name: z.string().optional(),
});

type FormDataType = z.infer<typeof FormSchema>;

export const NewAccountPage = () => {
  const { passphrase, addAccount } = useZustandStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(FormSchema) });
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (account) => {
    const B32_REGEX = /^[A-Z2-7]+=*$/;
    if (B32_REGEX.test(account.secret.toUpperCase())) {
      const encryptedSecret = await encryptString(account.secret, passphrase);

      await addAccount({
        username: account.username,
        name: account.name,
        secret: encryptedSecret,
      });
    }
    navigate("/accounts");
  });

  return (
    <div className="flex justify-center mt-[100px] h-full">
      <div
        className="bg-white w-[300px] p-[20px] rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Add new account</h1>
        <form className="flex flex-col gap-[20px] mt-[20px]" onSubmit={onSubmit}>
          <Input
            className={errors.secret?.message ? "outline-red-500 ring-transparent" : ""}
            placeholder="Secret - Required"
            maxLength={512}
            {...register("secret")}
          />
          <Input
            className={errors.username?.message ? "outline-red-500 ring-transparent" : ""}
            placeholder="Username - Required"
            maxLength={512}
            {...register("username")}
          />
          <Input placeholder="Issuer" maxLength={512} {...register("name")} />
          <Button className="mt-[10px] w-full self-center">Create</Button>
        </form>
      </div>
    </div>
  );
};
