import { DEPARTMENTS_QUERY } from "@/screens/admin/department/gql";
import { ROOMS_QUERY } from "@/screens/admin/room/gql";
import { lazy } from "react";
import { createElement } from "react";

// Admin routes
const Dashboard = lazy(() => import("@/screens/admin/dashboard"));
const Users = lazy(() => import("@/screens/admin/user"));
const UserForm = lazy(() => import("@/screens/admin/user/form"));
const Patients = lazy(() => import("@/screens/admin/patient"));
const PatientForm = lazy(() => import("@/screens/admin/patient/form"));
const SharedList = lazy(() => import("@/screens/admin/shared/index"));

// staff routes
const PharmacistDashboard = lazy(
  () => import("@/screens/pharmacist/dashboard/index"),
);
const BrowsePatient = lazy(() => import("@/screens/staff/patient/browse"));
const BrowseExamination = lazy(
  () => import("@/screens/staff/examination/browse"),
);
const FormExamination = lazy(() => import("@/screens/staff/examination/form"));

// pharmacist routes
const BrowsePharmacyItem = lazy(
  () => import("@/screens/pharmacist/pharmacy-item/browse"),
);
const FormPharmacyItem = lazy(
  () => import("@/screens/pharmacist/pharmacy-item/form"),
);
const BrowsePrescription = lazy(
  () => import("@/screens/pharmacist/prescription/browse"),
);

// Availability
const Availability = lazy(() => import("@/screens/availability/index"));

export const AdminRoutes = [
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

export const StaffRoutes = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
  {
    path: "patient/browse",
    element: createElement(BrowsePatient),
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
    path: "examination/browse",
    element: createElement(BrowseExamination),
  },
  {
    path: "examination/new",
    element: createElement(FormExamination),
  },
  {
    path: "examination/:id/update",
    element: createElement(FormExamination),
  },
];

export const PharmacistRoutes = [
  {
    path: "dashboard",
    element: createElement(PharmacistDashboard),
  },
  {
    path: "pharmacy-item/browse",
    element: createElement(BrowsePharmacyItem),
  },
  {
    path: "pharmacy-item/new",
    element: createElement(FormPharmacyItem),
  },
  {
    path: "pharmacy-item/:id/update",
    element: createElement(FormPharmacyItem),
  },
  {
    path: "prescription/browse",
    element: createElement(BrowsePrescription),
  },
];

export const TechnicianRoutes = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
  {
    path: "examination/browse",
    element: createElement(BrowseExamination),
  },
  {
    path: "availability",
    element: createElement(Availability),
  },
];

export const DoctorRoutes = [
  {
    path: "dashboard",
    element: createElement(Dashboard),
  },
  {
    path: "examination/browse",
    element: createElement(BrowseExamination),
  },
  {
    path: "availability",
    element: createElement(Availability),
  },
];
