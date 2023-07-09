import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { Modal, ModalProps } from "./modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "../lib/db";
import { useAuth } from "../hooks/useAuth";
import { useAccountsStore } from "../store/useAccountsStore";
import { encryptString } from "../lib/rustFunctions";

const FormSchema = z.object({
  secret: z.string().min(1, { message: "Required" }),
  username: z.string().min(1, { message: "Required" }),
  issuer: z.string().optional(),
});

type FormDataType = z.infer<typeof FormSchema>;

export const ModalCreate = ({ modalOpen, setModalOpen }: ModalProps) => {
  const { session } = useAuth();
  const { addAccount } = useAccountsStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(FormSchema) });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const encryptedSecret = await encryptString(formData.secret.split(" ").join(""));
      const { data } = await db
        .from("accounts")
        .insert([
          {
            user_id: session?.user.id,
            secret: encryptedSecret,
            username: formData.username,
            issuer: formData.issuer,
          },
        ])
        .select()
        .single();

      addAccount(data);
    } catch (error) {
      console.log(error);
    } finally {
      setModalOpen(false);
    }
  });

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="bg-white w-[300px] p-[20px] rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-[24px] text-center font-medium">Add new account</h1>
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
          <Input placeholder="Issuer" maxLength={512} {...register("issuer")} />
          <Button className="mt-[10px] self-center">Create</Button>
        </form>
      </div>
    </Modal>
  );
};
