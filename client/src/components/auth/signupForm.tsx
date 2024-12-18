// signupForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Fields } from "@/components/auth/accountField";
import axios from "axios";
import useAuth from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const signupSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  email: z.string().email({ message: "Please enter a valid email." }),
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." }),
});

const signupItems = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "Email" },
  { name: "username", label: "Username" },
  { name: "password", label: "Password", type: "password" },
];

export const SignupForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (user: z.infer<typeof signupSchema>) => {
    try {
      await signup(user);
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
          <Fields form={form} FieldItems={signupItems} />
        </div>
        <div className="flex w-full">
          <p className="">Already have an account?</p>
          <Link
            className="mx-2 font-bold text-accent hover:text-white transition-all ease-in-out duration-200"
            to="/auth/login"
          >
            LOGIN
          </Link>
        </div>
        <div className="flex justify-end">
          <Button
            className="ml-auto active:brightness-50"
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
