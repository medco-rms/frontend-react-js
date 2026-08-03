import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import logo from "@/assets/images/logo.png";
import { useMainLayout, type MenuItem } from "./useMainLayout";
import type { HeaderProps } from "./Header";
import { CMContext, type CMPropsType } from "react-project-scaffold-ts";

const SideBar = ({
  onCollapsed,
  onSelect,
}: {
  onCollapsed: (value: boolean) => void;
  onSelect: (value: HeaderProps) => void;
}) => {
  const location = useLocation();
  const { setConfirmationModalProps: setcmProps } = useContext(CMContext);

  const handleLogout = async () => {
    setcmProps((prev: CMPropsType) => ({
      ...prev,
      content: "Are you sure want to log out from system ?",
      okButtonText: "Yes, Proceed.",
      cancelButtonText: "Nuh, Stay!",
      onOk: async () => {},
      show: true,
    }));
  };

  useEffect(() => {
    setcmProps((prev: CMPropsType) => ({
      ...prev,
      onCancel: () => {},
    }));
  }, []);

  const { navItems: menuItems, getPageContent } = useMainLayout({
    onLogout: handleLogout,
  });

  const [collapsed, setCollapsed] = useState(false);
  const currentPage: HeaderProps = getPageContent([location.pathname]);

  const row = (item: MenuItem, className: string) => {
    return (
      <Link
        to={{
          pathname: item.path,
        }}
        className={`flex items-center px-2 py-2 rounded-sm text-[#5D7285]! uppercase ${
          currentPage?.key === item.key
            ? `font-semibold! text-[#0C7FDA]! bg-[#E9F5FE]!`
            : "hover:font-semibold! hover:text-[#0C7FDA]! hover:bg-[#E9F5FE]!"
        } ${className}`}
        onClick={() => {
          item?.onclick ? item.onclick() : onSelect(currentPage);
        }}
      >
        <span className="shrink-0">
          {item.icon({
            iconColor: currentPage?.key === item.key ? "#0C7FDA" : "#5D7285",
          })}
        </span>
        <span
          className={`ml-3 ${
            collapsed ? "hidden" : "block"
          } whitespace-nowrap  ${
            currentPage?.key === item.key
              ? `font-semibold! text-[#0C7FDA]!`
              : "hover:font-semibold! hover:text-[#0C7FDA]!"
          }  ${className}`}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-start px-6 py-1 shadow-md ">
        <span>
          <img
            src={logo}
            width={collapsed ? 50 : 40}
            height={collapsed ? 50 : 40}
            title="Medco Medical RMS"
          />
        </span>
        {!collapsed && (
          <span className="uppercase font-bold text-[#5D7285]! text-sm ml-2">
            {"Medco Medical RMS"}
          </span>
        )}
      </div>

      {/* Menu Items */}
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          {menuItems.slice(0, -1).map((item: MenuItem) => (
            <li key={item.key} title={item?.label}>
              {row(item, "")}
            </li>
          ))}
          <li className="absolute bottom-8 left-0 w-full">
            {row(menuItems[menuItems.length - 1], "px-4!")}
          </li>
        </ul>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => {
          setCollapsed(!collapsed);
          onCollapsed(!collapsed);
        }}
        className="absolute bottom-8 right-0 transform translate-x-1/2 bg-gray-900 rounded-full p-2 shadow-md hover:shadow-lg border border-gray-100 text-gray-500 hover:text-primary transition-colors"
      >
        <Icon
          icon="ph:caret-left-light"
          width={20}
          height={20}
          className={`hover:cursor-pointer transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
          color="white"
        />
      </button>
    </>
  );
};

export default SideBar;
