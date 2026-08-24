import { AppRoute, UtilContext } from "react-project-scaffold-ts";
import SideBar from "./layouts/sidebar";
import { Index } from "./layouts/routes";
import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { Header } from "./layouts/Header";

// Lazy load Header and SideBar to ensure they render inside Router context
const HeaderLazy = lazy(() => Promise.resolve({ default: Header }));
const SideBarLazy = lazy(() => Promise.resolve({ default: SideBar }));

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setAPIConfig } = useContext(UtilContext);

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

  return (
    <AppRoute
      routes={Index}
      defaultAdminHeader={{
        classNames: "bg-white! shadow-md! border-b-2! border-gray-200!",
        content: (
          <Suspense fallback={<div />}>
            <HeaderLazy />
          </Suspense>
        ),
      }}
      defaultAdminSideBar={{
        classNames: "bg-white! shadow-md! border-r-2! border-gray-200!",
        content: (
          <Suspense fallback={<div />}>
            <SideBarLazy onCollapsed={setCollapsed} onSelect={() => {}} />
          </Suspense>
        ),
        props: {
          collapsed: collapsed,
        },
      }}
      mainContainerClassName=" rounded-md! p-0! bg-gray-50!"
    />
  );
};

export default App;
