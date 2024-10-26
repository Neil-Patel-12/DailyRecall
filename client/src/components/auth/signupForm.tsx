// signupForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Fields } from "@/components/auth/accountField";
import axios from "axios";

const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
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
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        user,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data.errors;
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
        <div className="flex justify-end">
          <Button className="mt-4 ml-auto" variant="outline" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
