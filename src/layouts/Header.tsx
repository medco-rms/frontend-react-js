import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "react-project-scaffold-ts";
import { useLocation } from "react-router-dom";
import { useMainLayout } from "./useMainLayout";

export type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
  key?: string;
  bgColor?: string;
};

const Header = ({}: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { getPageContent } = useMainLayout({});
  const currentPage: HeaderProps = getPageContent([location.pathname]);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="text-lg  text-[#5D7285]! text-left">
          {currentPage?.pageTitle ?? ""}
        </div>
        <div className=" text-[#5D7285]! font-light">
          {currentPage?.pageTitleDescription ?? ""}
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative text-[#5D7285]! hover:text-primary transition-colors duration-200 cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Icon icon="mdi:bell-outline" width={30} height={30} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-white rounded-full"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-3 focus:outline-none cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center justify-center text-[#5D7285]!">
              <Icon icon="ei:user" width={40} height={40} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export { Header };
