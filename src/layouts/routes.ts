import { lazy } from "react";
import { createElement } from "react";

const Dashboard = lazy(() => import("@/screens/dashboard"));

export const Index = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
];
