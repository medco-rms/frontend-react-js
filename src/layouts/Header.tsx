import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, type ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { useMainLayout } from "./useMainLayout";
import {
  CMContext,
  useAuthClient,
  type CMPropsType,
} from "react-project-scaffold-ts";
import toast from "react-hot-toast";
import { Popover } from "antd";

export type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
  key?: string;
  bgColor?: string;
};

const Header = ({}: HeaderProps) => {
  const location = useLocation();
  const { getPageContent } = useMainLayout({});
  const currentPage: HeaderProps = getPageContent(location.pathname);
  const { setConfirmationModalProps: setcmProps } = useContext(CMContext);
  const authClient = useAuthClient();

  const Logout = async ({
    onRequest,
    onResponse,
    onClear,
  }: {
    onRequest?: () => void;
    onResponse?: () => void;
    onClear?: () => void;
  }) => {
    await authClient.signOut(
      {},
      {
        onRequest: () => {
          onRequest?.();
        },
        onResponse: () => {
          onClear?.();
          onResponse?.();
          window.location.replace("/auth/login");
        },
        onError: (ctx: any) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleLogout = async () => {
    setcmProps((prev: CMPropsType) => ({
      ...prev,
      content: "Are you sure want to log out from system ?",
      okButtonText: "Yes, Proceed.",
      cancelButtonText: "Nuh, Stay!",
      onOk: async () => {
        Logout({});
      },
      show: true,
    }));
  };

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
        <div className="relative">
          <button
            className="relative text-[#5D7285]! hover:text-primary transition-colors duration-200 cursor-pointer"
            onClick={() => {}}
          >
            <Icon icon="mdi:bell-outline" width={30} height={30} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-white rounded-full"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <Popover
            placement="bottom"
            content={() => {
              return (
                <div>
                  {[
                    {
                      title: "Logout",
                      onClick: () => handleLogout(),
                      icon: (
                        <Icon
                          icon="material-symbols:logout"
                          width={22}
                          height={22}
                          className="text-red-500"
                        />
                      ),
                      classNames: {
                        text: "hover:cursor-pointer hover:bg-red-50 text-red-500 ",
                      },
                    },
                  ].map(
                    (item: {
                      title: string;
                      onClick: () => void;
                      icon: ReactElement;
                      classNames?: {
                        text?: string;
                      };
                    }) => (
                      <span
                        key={item.title}
                        role="button"
                        tabIndex={0}
                        onClick={item.onClick}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            item.onClick();
                          }
                        }}
                        className={`flex items-center gap-3 py-2 px-6 font-bold rounded-md transition ${item?.classNames?.text}`}
                        title={item.title}
                      >
                        {item?.icon}
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
                      </span>
                    ),
                  )}
                </div>
              );
            }}
            arrow={false}
            trigger="click"
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            className="flex items-center space-x-3 focus:outline-none cursor-pointer! w-2"
          >
            <div className="flex items-center justify-center text-[#5D7285]! cursor-pointer!">
              <Icon icon="ei:user" width={40} height={40} />
            </div>
          </Popover>
        </div>
      </div>
    </>
  );
};

export { Header };
