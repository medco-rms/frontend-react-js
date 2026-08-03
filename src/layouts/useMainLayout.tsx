import { Icon } from "@iconify/react/dist/iconify.js";
import { use, type ReactElement } from "react";
import { UserContext } from "react-project-scaffold-ts";
import type { HeaderProps } from "./Header";

// Define the type for a single, clickable menu item
export type MenuItem = {
  key: string;
  icon: ({ iconColor }: { iconColor: string }) => ReactElement;
  label: string;
  path?: string;
  role?: string;
  onclick?: () => void;
};

// Define the type for a navigation item, which can be a single item or a group
export type NavigationItem = MenuItem & {
  children?: MenuItem[];
};

export const useMainLayout = ({ onLogout }: { onLogout?: () => void }) => {
  const { userData } = use(UserContext);

  const navItems: NavigationItem[] = [
    {
      key: "1",
      icon: ({ iconColor }: { iconColor: string }) => (
        <Icon
          icon="material-symbols:dashboard"
          color={iconColor}
          width={30}
          height={30}
        />
      ),
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      key: "2",
      icon: ({ iconColor }: { iconColor: string }) => (
        <Icon icon="mdi:users" color={iconColor} width={30} height={30} />
      ),
      label: "System Users",
      path: "/admin/users",
      role: "user",
    },

    {
      key: "7",
      icon: ({ iconColor }: { iconColor: string }) => (
        <Icon icon="mdi:settings" width={30} height={30} color={iconColor} />
      ),
      label: "Settings",
      onclick: () => {
        onLogout?.();
      },
    },
  ];

  const getPageContent = (key: string[]): HeaderProps => {
    if (key.includes("/admin/dashboard")) {
      return {
        pageTitle: "Welcome, " + userData?.name,
        pageTitleDescription: "Overview of your account and recent activities",
        key: "1",
      };
    }

    return {
      pageTitle: "",
      pageTitleDescription: "",
    };
  };

  return { navItems, getPageContent };
};
