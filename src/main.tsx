import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import {
  QueryProvider,
  UserProvider,
  UtilProvider,
  Drawer,
  CMProvider,
  ConfirmationModal,
} from "react-project-scaffold-ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" />
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
            <CMProvider>
              <Drawer />
              <ConfirmationModal />
              <App />
            </CMProvider>
          </QueryProvider>
        </UserProvider>
      </UtilProvider>
    </ConfigProvider>
  </StrictMode>,
);
