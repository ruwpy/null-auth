import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../components/icons";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { db } from "../lib/db";

const RegisterFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

type RegisterDataType = z.infer<typeof RegisterFormSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({ resolver: zodResolver(RegisterFormSchema) });

  const onSubmit = handleSubmit(async (loginData: RegisterDataType) => {
    const { email, password } = loginData;
    const { data, error } = await db.auth.signUp({ email, password });

    if (data) navigate("/");
    if (error) console.log(error);

    // TODO: save password locally for user for further actions with crypting
  });

  return (
    <div className="w-full h-full px-[20px] flex flex-col justify-center items-center">
      <Icons.nullauth width={48} height={48} />
      <h1 className="text-[24px] text-center font-medium mt-[10px]">
        Register to null-auth
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col w-[250px] gap-[15px] mt-[20px]">
        <Input
          className={errors.email?.message ? "outline-red-500 ring-transparent" : ""}
          placeholder="Email"
          {...register("email")}
        />
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
        <Button className="w-full">Sign up</Button>
      </form>
      <Link to={"/login"} className="text-black/50 border-b border-black/30">
        <p className="text-[14px] mt-[20px]">Already have an account? Sign in</p>
      </Link>
    </div>
  );
};