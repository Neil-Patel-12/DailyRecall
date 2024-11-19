// Signup.tsx
import { SignupForm } from "@/components/auth/signupForm";
import { Separator } from "@/components/ui/separator";


export const Signup = () => {
  return (
    <div className="page-container flex justify-center items-center">
      <div className="w-[550px] max-h-[600px] bg-primary p-10 flex justify-center flex-col shadow-lg shadow-slate-900">
        <div className="mb-auto">
          <h1 className="text-3xl font-bold text-center text-accent">GET STARTED</h1>
          <Separator className="m-3 mb-8 bg-slate-700" />
        </div>
        <SignupForm />
      </div>
    </div>
  );
};
