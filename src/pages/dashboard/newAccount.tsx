import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { encryptString } from "@/lib/rustFunctions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContextProvider } from "@/hooks/useContextProvider";
import { addAccount } from "@/store/actions";

const FormSchema = z.object({
  secret: z
    .string()
    .min(1, { message: "Required" })
    .regex(/^[A-Z2-7]+=*$/i),
  issuer: z.string().min(1, { message: "Required" }),
  name: z.string().optional(),
});

type FormDataType = z.infer<typeof FormSchema>;

export const NewAccountPage = () => {
  const { passphrase, setAccounts } = useContextProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(FormSchema) });
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (account) => {
    try {
      const accountToAdd = {
        issuer: account.issuer,
        name: account.name
          ? `${account.issuer}:${account.name}`
          : `${account.issuer}:nullauth`,
        secret: account.secret.toUpperCase(),
      };

      const secret = await addAccount({
        account: accountToAdd,
        passphrase,
      });
      if (secret) setAccounts((prev) => [...prev, { ...accountToAdd, secret }]);

      navigate("/accounts");
      toast.success("Account was created");
    } catch (error) {
      toast.error("Error has occured, try again");
    }
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
            className={errors.issuer?.message ? "outline-red-500 ring-transparent" : ""}
            placeholder="Issuer - Required"
            maxLength={512}
            {...register("issuer")}
          />
          <Input placeholder="Name" maxLength={512} {...register("name")} />
          <Button className="mt-[10px] w-full self-center">Create</Button>
        </form>
      </div>
    </div>
  );
};
