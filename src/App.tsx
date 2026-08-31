import { AppRoute, UtilContext } from "react-project-scaffold-ts";
import SideBar from "./layouts/sidebar";
import {
  AdminRoutes,
  StaffRoutes,
  PharmacistRoutes,
  TechnicianRoutes,
  DoctorRoutes
} from "./layouts/routes";
import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { Header } from "./layouts/Header";
import type { UserRole } from "./assets/models";

// Lazy load Header and SideBar to ensure they render inside Router context
const HeaderLazy = lazy(() => Promise.resolve({ default: Header }));
const SideBarLazy = lazy(() => Promise.resolve({ default: SideBar }));

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setAPIConfig, setGeneralConfig } = useContext(UtilContext);

  // Set API Config for the application
  useEffect(() => {
    setAPIConfig({
      endpoint: import.meta.env.DEV
        ? "http://localhost:3000"
        : "http://localhost:3000",
      type: "GRAPHQL",
      token: "",
    });
  }, [setAPIConfig]);

  const setRedirectUrl = async (role: string) => {
    const redirectUrls: Record<string, string> = {
      ADMIN: "/admin/dashboard",
      STAFF: "/staff/dashboard",
      PHARMACIST: "/pharmacist/dashboard",
      TECHNICIAN: "/technician/dashboard",
      DOCTOR: "/doctor/dashboard",
    };

    const url = redirectUrls[role];

    if (!url) {
      console.error(`Unknown role: ${role}`);
      return;
    }

    setGeneralConfig((prev) => ({
      ...prev,
      redirectUrl: url,
    }));
  };

  useEffect(() => {
    setGeneralConfig((prev) => ({
      ...prev,
      redirectFun: setRedirectUrl,
    }));
  }, []);

  const getSideBarProps = (role: UserRole) => ({
    classNames: "bg-white! shadow-md! border-r-2! border-gray-200!",
    content: (
      <Suspense fallback={<div />}>
        <SideBarLazy
          onCollapsed={setCollapsed}
          onSelect={() => {}}
          role={role}
        />
      </Suspense>
    ),
    props: {
      collapsed,
    },
  });

  const baseRouteProps = {
    headerContent: {
      classNames: "bg-white! shadow-md! border-b-2! border-gray-200!",
      content: (
        <Suspense fallback={<div />}>
          <HeaderLazy />
        </Suspense>
      ),
    },
    sideBarContent: undefined,
    mainContainerClassName: "rounded-md! p-0! bg-gray-50!",
  };

  return (
    <AppRoute
      routes={[
        {
          ...baseRouteProps,
          path: "/admin/*",
          role: "ADMIN",
          childrens: AdminRoutes,
          sideBarContent: getSideBarProps("ADMIN"),
        },
        {
          ...baseRouteProps,
          path: "/staff/*",
          role: "STAFF",
          sideBarContent: getSideBarProps("STAFF"),
          childrens: StaffRoutes,
        },
        {
          ...baseRouteProps,
          path: "/pharmacist/*",
          role: "PHARMACIST",
          sideBarContent: getSideBarProps("PHARMACIST"),
          childrens: PharmacistRoutes,
        },
        {
          ...baseRouteProps,
          path: "/technician/*",
          role: "TECHNICIAN",
          sideBarContent: getSideBarProps("TECHNICIAN"),
          childrens: TechnicianRoutes,
        },
        {
          ...baseRouteProps,
          path: "/doctor/*",
          role: "DOCTOR",
          sideBarContent: getSideBarProps("DOCTOR"),
          childrens: DoctorRoutes,
        },
      ]}
    />
  );
};

export default App;
