import { lazy } from "react";
import { createElement } from "react";

const Dashboard = lazy(() => import("@/screens/dashboard"));
const Users = lazy(() => import("@/screens/user"));
const UserForm = lazy(() => import("@/screens/user/form"));
const Patients = lazy(() => import("@/screens/patient"));
const PatientForm = lazy(() => import("@/screens/patient/form"));
const Departments = lazy(() => import("@/screens/department/index"));

export const Index = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
  {
    path: "doctor/index",
    element: createElement(Users, { role: "DOCTOR" }),
  },
  {
    path: "doctor/new",
    element: createElement(UserForm, { role: "DOCTOR" }),
  },
  {
    path: "doctor/:id/update",
    element: createElement(UserForm, { role: "DOCTOR" }),
  },
  {
    path: "nurse/index",
    element: createElement(Users, { role: "NURSE" }),
  },
  {
    path: "nurse/new",
    element: createElement(UserForm, { role: "NURSE" }),
  },
  {
    path: "nurse/:id/update",
    element: createElement(UserForm, { role: "NURSE" }),
  },
  {
    path: "technician/index",
    element: createElement(Users, { role: "TECHNICIAN" }),
  },
  {
    path: "technician/new",
    element: createElement(UserForm, { role: "TECHNICIAN" }),
  },
  {
    path: "technician/:id/update",
    element: createElement(UserForm, { role: "TECHNICIAN" }),
  },
  {
    path: "pharmacist/index",
    element: createElement(Users, { role: "PHARMACIST" }),
  },
  {
    path: "pharmacist/new",
    element: createElement(UserForm, { role: "PHARMACIST" }),
  },
  {
    path: "pharmacist/:id/update",
    element: createElement(UserForm, { role: "PHARMACIST" }),
  },
  {
    path: "patient/index",
    element: createElement(Patients),
  },
  {
    path: "patient/new",
    element: createElement(PatientForm),
  },
  {
    path: "patient/:id/update",
    element: createElement(PatientForm),
  },
  {
    path: "staff/index",
    element: createElement(Users, { role: "STAFF" }),
  },
  {
    path: "department/index",
    element: createElement(Departments),
  },
];
