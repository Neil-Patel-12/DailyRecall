// UserDropdown.tsx

import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import useAuth from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

interface LinkProps {
  label: string;
  path: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const UserDropdown = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" alignOffset={-10}>
        <DropdownMenuLabel className="text-md">
          Welcome, {user?.firstName}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Links />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Links = () => {
  const { logout } = useAuth();

  const links: LinkProps[] = [
    {
      label: "Profile",
      path: "/user/profile",
      Icon: FaRegUser,
    },
    {
      label: "My Posts",
      path: "/user/posts",
      Icon: IoDocumentsOutline,
    },
    {
      label: "Settings",
      path: "/user/settings",
      Icon: IoMdSettings,
    },
    {
      label: "Logout",
      path: "/",
      Icon: IoLogOutOutline,
      onClick: logout,
    },
  ];

  return (
    <>
      {links.map(({ label, path, Icon, onClick }) => (
        <DropdownMenuItem
          asChild
          className="text-md"
          onClick={onClick}
          key={label}
        >
          <Link to={path}>
            <Icon className="mr-2"/>
            {label}
          </Link>
        </DropdownMenuItem>
      ))}
    </>
  );
};
