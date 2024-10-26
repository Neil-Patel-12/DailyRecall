// Navbar.tsx

import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-primary-foreground h-[60px] w-full flex justify-center fixed top-0 left-0 z-[49]">
      <ul className="w-[70%] h-full flex items-center gap-4">
        <Link className="mr-auto border-none" to="/home">
          [LOGO IMG]
        </Link>
        <Link
          className="flex items-center justify-center h-[calc(60px*0.6)] w-[calc(60px*0.6)] text-background
        border-none rounded-full transition-all duration-150 ease-linear bg-white cursor-pointer hover:brightness-75"
          to="/signup"
        >
          D/R
        </Link>
        {children}
      </ul>
    </nav>
  );
};
