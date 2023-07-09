import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../components/icons";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { db } from "../lib/db";
import { toast } from "react-hot-toast";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginDataType = z.infer<typeof LoginFormSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit = handleSubmit(async (loginData: LoginDataType) => {
    const { email, password } = loginData;
    const { data, error } = await db.auth.signInWithPassword({ email, password });

    if (data.user) navigate("/");
    if (error) {
      if (error.status === 400) toast.error(error.message);
    }

    // TODO: save password locally for user for further actions with crypting
  });

  return (
    <div className="fixed inset-0 px-[20px] flex flex-col justify-center items-center">
      <Icons.nullauth width={48} height={48} />
      <h1 className="text-[24px] text-center font-medium mt-[10px]">
        Login to null-auth
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
        <Button className="w-full">Sign in</Button>
      </form>
      <Link to={"/register"} className="text-black/50 border-b border-black/30">
        <p className="text-[14px] mt-[20px]">Don't have an account? Sign up</p>
      </Link>
    </div>
  );
};
