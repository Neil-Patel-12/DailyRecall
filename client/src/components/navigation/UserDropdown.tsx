// UserDropdown.tsx

import * as React from "react";

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
import { FaMagnifyingGlassChart } from "react-icons/fa6";

// Define the structure for link props used in the dropdown menu
interface LinkProps {
  label: string;
  path: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

// wraps children in a dropdown menu
export const UserDropdown = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // Access the authenticated user from the AuthContext

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

// Links component, renders individual menu items
const Links = () => {
  const { logout } = useAuth(); // Access logout

  const links: LinkProps[] = [
    {
      label: "Profile",
      path: "/user/profile",
      Icon: FaRegUser, // Profile icon
    },
    {
      label: "My Posts",
      path: "/user/posts",
      Icon: IoDocumentsOutline, // Posts icon
    },
    {
      label: "Topic Growth",
      path: "/user/topics",
      Icon: FaMagnifyingGlassChart, // topics icon
    },
    {
      label: "Settings",
      path: "/user/settings",
      Icon: IoMdSettings, // settings icon
    },
    {
      label: "Logout",
      path: "/", // redirect on logout
      Icon: IoLogOutOutline, // logout icon
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
            <Icon className="mr-2" />
            {label}
          </Link>
        </DropdownMenuItem>
      ))}
    </>
  );
};
