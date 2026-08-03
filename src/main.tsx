import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import {
  QueryProvider,
  UserProvider,
  UtilProvider,
} from "react-project-scaffold-ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            // defaultBg: "#13C110",
            // defaultActiveBg: "#13C110",
          },
        },
      }}
    >
      <UtilProvider>
        <UserProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </UserProvider>
      </UtilProvider>
    </ConfigProvider>
  </StrictMode>,
);
