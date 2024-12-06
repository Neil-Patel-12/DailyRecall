// loginForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Fields } from "./accountField";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/contexts/AuthContext";

// define validation schema using Zod
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Please enter a valid password." }),
});

// define fields to render in the form
const loginItems = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", type: "password" },
];

// loginform component definition
export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // SUBMIT HANDLER FOR THE FORM
  const onSubmit = async (user: z.infer<typeof loginSchema>) => {
    try {
      await login(user);
      navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data;
        console.log(errors);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8">
          <Fields form={form} FieldItems={loginItems} />
        </div>
        <div className="flex w-full">
          <p className="">No account?</p>
          <Link
            className="mx-2 font-bold text-accent hover:text-white transition-all ease-in-out duration-200"
            to="/auth/signup"
          >
            REGISTER
          </Link>
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-4 ml-auto active:brightness-50"
            variant="outline"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
