import { DEPARTMENTS_QUERY } from "@/screens/department/gql";
import { ROOMS_QUERY } from "@/screens/room/gql";
import { lazy } from "react";
import { createElement } from "react";

const Dashboard = lazy(() => import("@/screens/dashboard"));
const Users = lazy(() => import("@/screens/user"));
const UserForm = lazy(() => import("@/screens/user/form"));
const Patients = lazy(() => import("@/screens/patient"));
const PatientForm = lazy(() => import("@/screens/patient/form"));
const SharedList = lazy(() => import("@/screens/shared/index"));

export const Index = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
  {
    path: "doctors",
    element: createElement(Users, { role: "DOCTOR" }),
  },
  {
    path: "doctors/new",
    element: createElement(UserForm, { role: "DOCTOR" }),
  },
  {
    path: "doctors/:id/update",
    element: createElement(UserForm, { role: "DOCTOR" }),
  },
  {
    path: "nurses",
    element: createElement(Users, { role: "NURSE" }),
  },
  {
    path: "nurses/new",
    element: createElement(UserForm, { role: "NURSE" }),
  },
  {
    path: "nurses/:id/update",
    element: createElement(UserForm, { role: "NURSE" }),
  },
  {
    path: "technicians",
    element: createElement(Users, { role: "TECHNICIAN" }),
  },
  {
    path: "technicians/new",
    element: createElement(UserForm, { role: "TECHNICIAN" }),
  },
  {
    path: "technicians/:id/update",
    element: createElement(UserForm, { role: "TECHNICIAN" }),
  },
  {
    path: "pharmacists",
    element: createElement(Users, { role: "PHARMACIST" }),
  },
  {
    path: "pharmacists/new",
    element: createElement(UserForm, { role: "PHARMACIST" }),
  },
  {
    path: "pharmacists/:id/update",
    element: createElement(UserForm, { role: "PHARMACIST" }),
  },
  {
    path: "patients",
    element: createElement(Patients),
  },
  {
    path: "patients/new",
    element: createElement(PatientForm),
  },
  {
    path: "patients/:id/update",
    element: createElement(PatientForm),
  },
  {
    path: "staffs",
    element: createElement(Users, { role: "STAFF" }),
  },
  {
    path: "departments",
    element: createElement(SharedList, {
      searchByCols: ["name", "type"],
      searchInputPlaceholderText: "Search by name & type",
      names: {
        getData: "departments",
        deleteData: "Department",
        popupLabel: "Department",
      },
      route: {
        api: DEPARTMENTS_QUERY(),
      },
      type: "dep",
    }),
  },
  {
    path: "rooms",
    element: createElement(SharedList, {
      searchByCols: ["name", "capacity", "status"],
      searchInputPlaceholderText: "Search by name, capacity & status",
      names: {
        getData: "rooms",
        deleteData: "Room",
        popupLabel: "Room",
      },
      route: {
        api: ROOMS_QUERY(),
      },
      type: "room",
    }),
  },
];
