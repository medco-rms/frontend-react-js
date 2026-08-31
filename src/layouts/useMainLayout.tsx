import { Icon } from "@iconify/react/dist/iconify.js";
import { use, type ReactElement } from "react";
import { UserContext } from "react-project-scaffold-ts";
import type { HeaderProps } from "./Header";
import type { UserRole } from "@/assets/models";

// Define the type for a single, clickable menu item
export type MenuItem = {
  key: string;
  icon: ({ iconColor }: { iconColor: string }) => ReactElement;
  label: string;
  path?: string;
  role?: string;
  onclick?: () => void;
  position?: "normal" | "bottom";
};

// Define the type for a navigation item, which can be a single item or a group
export type NavigationItem = MenuItem & {
  children?: MenuItem[];
};

export const useMainLayout = ({
  onLogout,
  role,
}: {
  onLogout?: () => void;
  role: UserRole;
}) => {
  const { userData } = use(UserContext);

  const navItems = (): NavigationItem[] => {
    let result: NavigationItem[];
    switch (role) {
      case "ADMIN":
        result = [
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
              <Icon
                icon="healthicons:doctor-24px"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Doctors",
            path: "/admin/doctors",
            role: "doctor",
          },
          {
            key: "3",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="healthicons:nurse"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Nurses",
            path: "/admin/nurses",
            role: "nurse",
          },
          {
            key: "4",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="icomoon-free:lab"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Technicians",
            path: "/admin/technicians",
            role: "technician",
          },
          {
            key: "5",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="glyphs:pharmacy-bold"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Pharmacists",
            path: "/admin/pharmacists",
            role: "pharmacist",
          },
          {
            key: "6",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="mdi:patient"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Patients",
            path: "/admin/patients",
            role: "patient",
          },
          {
            key: "7",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon icon="mdi:users" color={iconColor} width={30} height={30} />
            ),
            label: "Staffs",
            path: "/admin/staffs",
            role: "admin",
          },
          {
            key: "8",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="mingcute:department-fill"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Department",
            path: "/admin/departments",
            role: "admin",
          },
          {
            key: "9",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="ic:round-meeting-room"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Room",
            path: "/admin/rooms",
            role: "admin",
          },
          {
            key: "10",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="mdi:settings"
                width={30}
                height={30}
                color={iconColor}
              />
            ),
            label: "Settings",
            onclick: () => {
              onLogout?.();
            },
            position: "bottom",
          },
        ];
        break;
      case "STAFF":
        result = [
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
            path: "/staff/dashboard",
          },
          {
            key: "6",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="mdi:patient"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Patients",
            path: "/staff/patients",
            role: "patient",
          },
          {
            key: "11",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="healthicons:stethoscope"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Examination",
            path: "/staff/examination/browse",
          },
        ];
        break;
      case "PHARMACIST":
        result = [
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
            path: "/pharmacist/dashboard",
          },
          {
            key: "12",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="healthicons:pharmacy"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Pharmacy",
            path: "/pharmacist/pharmacy-item/browse",
          },
          {
            key: "13",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="fa-solid:file-prescription"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Prescription",
            path: "/pharmacist/prescription/browse",
          },
        ];
        break;
      case "TECHNICIAN":
        result = [
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
            path: "/technician/dashboard",
          },
          {
            key: "11",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="healthicons:stethoscope"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Examination",
            path: "/technician/examination/browse",
          },
          {
            key: "14",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="fluent:shifts-availability-20-filled"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Availability",
            path: "/technician/availability/set",
            position: "bottom",
          },
        ];
        break;
      case "DOCTOR":
        result = [
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
            path: "/doctor/dashboard",
          },
          {
            key: "11",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="healthicons:stethoscope"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Examination",
            path: "/doctor/examination/browse",
          },
          {
            key: "14",
            icon: ({ iconColor }: { iconColor: string }) => (
              <Icon
                icon="fluent:shifts-availability-20-filled"
                color={iconColor}
                width={30}
                height={30}
              />
            ),
            label: "Availability",
            path: "/doctor/availability/set",
            position: "bottom",
          },
        ];
        break;
      default:
        result = [];
        break;
    }
    return result;
  };

  const getPageContent = (value?: unknown): HeaderProps => {
    const firstValue = Array.isArray(value) ? value[0] : value;

    if (typeof firstValue !== "string" || !firstValue.trim()) {
      return {
        pageTitle: "",
        pageTitleDescription: "",
      };
    }

    const paths = firstValue.split("/");

    if (paths.includes("dashboard")) {
      return {
        pageTitle: "Welcome, " + userData?.name?.toUpperCase(),
        pageTitleDescription: "Overview of your account and recent activities",
        key: "1",
      };
    }

    if (paths.includes("doctors")) {
      return {
        pageTitle: "Doctor Management",
        pageTitleDescription:
          "Create a new doctor account and manage their information",
        key: "2",
      };
    }

    if (paths.includes("nurses")) {
      return {
        pageTitle: "Nurse Management",
        pageTitleDescription:
          "Create a new nurse account and manage their information",
        key: "3",
      };
    }

    if (paths.includes("technicians")) {
      return {
        pageTitle: "Technician Management",
        pageTitleDescription:
          "Create a new Lab & X-Ray technician account and manage their information",
        key: "4",
      };
    }

    if (paths.includes("pharmacists")) {
      return {
        pageTitle: "Pharmacist Management",
        pageTitleDescription:
          "Create a new pharmacist account and manage their information",
        key: "5",
      };
    }

    if (paths.includes("patients")) {
      return {
        pageTitle: "Patient Management",
        pageTitleDescription:
          "Create a new patient and manage their information",
        key: "6",
      };
    }

    if (paths.includes("staffs")) {
      return {
        pageTitle: "Staff Management",
        pageTitleDescription:
          "Create a new local staff account and manage their information",
        key: "7",
      };
    }

    if (paths.includes("departments")) {
      return {
        pageTitle: "Department Management",
        pageTitleDescription:
          "Create a new local department and manage their information",
        key: "8",
      };
    }

    if (paths.includes("rooms")) {
      return {
        pageTitle: "Room Management",
        pageTitleDescription:
          "Create a new local room and manage their information",
        key: "9",
      };
    }

    if (paths.includes("examination")) {
      return {
        pageTitle: "Examination Management",
        pageTitleDescription:
          "Create and manage examination information for patient",
        key: "11",
      };
    }

    if (paths.includes("pharmacy-item")) {
      return {
        pageTitle: "Pharmacy Management",
        pageTitleDescription:
          "Create and manage pharmacy items information for organization",
        key: "12",
      };
    }

    if (paths.includes("prescription")) {
      return {
        pageTitle: "Prescription Management",
        pageTitleDescription:
          "Dispense and manage prescription information for examination",
        key: "13",
      };
    }

    return {
      pageTitle: "",
      pageTitleDescription: "",
    };
  };

  return { navItems, getPageContent };
};
