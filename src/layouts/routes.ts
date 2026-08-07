import { lazy } from "react";
import { createElement } from "react";

const Dashboard = lazy(() => import("@/screens/dashboard"));
const DoctorList = lazy(() => import("@/screens/user/doctor"));
const DoctorForm = lazy(() => import("@/screens/user/form"));

export const Index = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
  {
    path: "doctor",
    element: createElement(DoctorList),
  },
  {
    path: "doctor/new",
    element: createElement(DoctorForm),
  },
  {
    path: "doctor/:id/update",
    element: createElement(DoctorForm),
  },
];
