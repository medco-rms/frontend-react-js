import { AppRoute } from "react-project-scaffold-ts";
import SideBar from "./layouts/sidebar";
import { Index } from "./layouts/routes";
import { useState } from "react";
import { Header } from "./layouts/Header";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppRoute
      routes={Index}
      defaultAdminHeader={{
        classNames: "bg-white! shadow-md! border-b-2! border-gray-200!",
        content: <Header />,
      }}
      defaultAdminSideBar={{
        classNames: "bg-white! shadow-md! border-r-2! border-gray-200!",
        content: (
          <SideBar
            onCollapsed={setCollapsed}
            onSelect={(item) => {
              console.log("%csrc/App.tsx:26 item", "color: #007acc;", item);
            }}
          />
        ),
        props: {
          collapsed: collapsed,
        },
      }}
      mainContainerClassName=" rounded-md! p-4! bg-gray-50!"
    />
  );
};

export default App;
