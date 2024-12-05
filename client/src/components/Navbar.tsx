// Navbar.tsx

import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/contexts/AuthContext";
import logo from "/logo.png";
import { MdOutlineAddBox } from "react-icons/md";
import { Button } from "./ui/button";
import { UserDropdown } from "./UserDropdown";

export const Navbar = ({ children }: { children?: ReactNode }) => {
  const { user } = useAuth();

  return (
    <nav className="bg-primary-foreground h-[60px] w-full flex justify-center fixed top-0 left-0 z-[49]">
      <ul className="w-[70%] h-full flex items-center gap-4">
        <Link className="mr-auto border-none" to="/home">
          <img className="w-[220px]" src={logo} />
        </Link>

        {user ? (
          <UserDropdown>
            <Button
              className="flex items-center justify-center h-[calc(60px*0.6)] w-[calc(60px*0.6)] text-background
        border-none rounded-full transition-all duration-150 ease-linear bg-white cursor-pointer hover:brightness-75"
            >
              D/R
            </Button>
          </UserDropdown>
        ) : (
          <div className="flex gap-4 min-w-[250px]">
            <AuthButtons buttons={buttons} />
          </div>
        )}

        {children}
      </ul>
    </nav>
  );
};

interface AuthButtonProps {
  label: string;
  path: string;
}

const buttons: AuthButtonProps[] = [
  {
    label: "Signup",
    path: "/user/signup",
  },
  {
    label: "Login",
    path: "/user/login",
  },
];

const AuthButtons = ({ buttons }: { buttons: Array<AuthButtonProps> }) => {
  const navigate = useNavigate();
  return buttons.map(({ label, path }) => (
    <Button
      key={label}
      variant="default"
      className="flex-1 p-4 truncate text-lg font-extrabold border-2 border-transparent hover:text-gray-400 hover:bg-primary hover:border-2 hover:border-accent"
      onClick={() => {
        navigate(path);
      }}
    >
      {label}
    </Button>
  ));
};
