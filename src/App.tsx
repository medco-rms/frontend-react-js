import { AppRoute, UtilContext } from "react-project-scaffold-ts";
import SideBar from "./layouts/sidebar";
import { Index } from "./layouts/routes";
import { useContext, useEffect, useState } from "react";
import { Header } from "./layouts/Header";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setAPIConfig } = useContext(UtilContext);

  // Set API Config for the application
  useEffect(() => {
    setAPIConfig({
      endpoint: "http://localhost:3000",
      type: "GRAPHQL",
      token: "",
    });
  }, [setAPIConfig]);

  return (
    <AppRoute
      routes={Index}
      defaultAdminHeader={{
        classNames: "bg-white! shadow-md! border-b-2! border-gray-200!",
        content: <Header />,
      }}
      defaultAdminSideBar={{
        classNames: "bg-white! shadow-md! border-r-2! border-gray-200!",
        content: <SideBar onCollapsed={setCollapsed} onSelect={() => {}} />,
        props: {
          collapsed: collapsed,
        },
      }}
      mainContainerClassName=" rounded-md! p-0! bg-gray-50!"
    />
  );
};

export default App;
