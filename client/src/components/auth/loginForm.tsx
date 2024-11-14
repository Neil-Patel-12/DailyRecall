// loginForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Fields } from "./accountField";
import { Button } from "../ui/button";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Please enter a valid password." }),
});

const loginItems = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", type: "password" },
];

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // change the api call
  const onSubmit = async (user: z.infer<typeof loginSchema>) => {
    console.log(user);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
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
        <div className="flex justify-end">
          <Button className="mt-4 ml-auto" variant="outline" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
