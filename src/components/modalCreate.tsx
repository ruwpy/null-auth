import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { Modal, ModalProps } from "./modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const FormSchema = z.object({
  secret: z.string().min(1, { message: "Required" }),
  label: z.string().min(1, { message: "Required" }),
  issuer: z.string().optional(),
});

export const ModalCreate = ({ modalOpen, setModalOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema) });

  const onSubmit = handleSubmit((data) => {
    // logic for generate 2fa
    setModalOpen(false);
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
            {...register("secret")}
          />
          <Input
            className={errors.label?.message ? "outline-red-500 ring-transparent" : ""}
            placeholder="Label - Required"
            {...register("label")}
          />
          <Input placeholder="Issuer" {...register("issuer")} />
          <Button className="mt-[10px] self-center">Create</Button>
        </form>
      </div>
    </Modal>
  );
};
