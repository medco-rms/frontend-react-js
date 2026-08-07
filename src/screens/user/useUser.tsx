import { type Gender } from "../../assets/models";
import { Icon } from "@iconify-icon/react";
import dayjs from "dayjs";
import {
  type FieldConfig,
  FieldType,
  UserProfileInfo,
} from "react-project-scaffold-ts";
import { type User } from "../../assets/models";

export const useUser = () => {
  const getTableColumns = ({
    onClick,
  }: {
    onClick?: (user: User) => void;
  }): any[] => [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (_: string, record: User) => (
        <UserProfileInfo
          full_name={`${record.firstName} ${record.middleName ?? ""} ${
            record.lastName
          }`}
          photoUrl={record.profileImage ?? ""}
          onClick={() => onClick?.(record)}
        />
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (val: string) => val || "-",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (val?: Gender) => val || "-",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (val?: Date) => (val ? dayjs(val).format("D MMM, YYYY") : "-"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (val: string) => val || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (val?: string) => val || "-",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const getCommonFormFields = (includeId = false): FieldConfig[] => {
    const fields: FieldConfig[] = [
      {
        name: "firstName",
        label: "First Name",
        type: FieldType.Input,
        placeholder: "e.g. John",
        rules: [{ required: true, message: "" }],
        prefix: <Icon icon="solar:user-outline" />,
      },
      {
        name: "middleName",
        label: "Middle Name",
        type: FieldType.Input,
        rules: [{ required: true, message: "" }],
        placeholder: "e.g. Michael",
      },
      {
        name: "lastName",
        label: "Last Name",
        type: FieldType.Input,
        placeholder: "e.g. Doe",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "gender",
        label: "Gender",
        type: FieldType.Select,
        placeholder: "Select Gender",
        prefix: <Icon icon="solar:users-group-rounded-outline" />,
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "phone",
        label: "Phone Number",
        type: FieldType.Phone,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "alternativePhone",
        label: "Alternative Phone",
        type: FieldType.Phone,
      },
      {
        name: "email",
        label: "Email",
        type: FieldType.email,
        placeholder: "someone@example.com",
        disabled: includeId,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "departmentId",
        type: FieldType.hidden,
        hidden: true,
        label: "",
      },
    ];

    if (!includeId) return fields;

    return [
      {
        name: "id",
        type: FieldType.hidden,
        hidden: true,
        label: "",
      },
      ...fields,
    ];
  };

  const getFormFields = ({
    image,
    includeId = false,
  }: {
    image?: string;
    includeId?: boolean;
  }): FieldConfig[] => [
    ...getCommonFormFields(includeId),
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: FieldType.Date,
      placeholder: "Select date of birth",
      suffix: <Icon icon="solar:calendar-outline" />,
    },

    {
      name: "employeeId",
      label: "Employee ID",
      type: FieldType.Input,
      placeholder: "Employee ID",
    },
    {
      name: "specialization",
      label: "Specialization",
      type: FieldType.Input,
      rules: [{ required: true, message: "" }],
      placeholder: "e.g. Cardiology",
    },
    {
      name: "education",
      label: "Education",
      type: FieldType.Input,
      rules: [{ required: true, message: "" }],

      rows: 3,
    },
    {
      name: "experienceYears",
      label: "Years of Experience",
      type: FieldType.number,
      rules: [{ required: true, message: "" }],
    },
    {
      name: "licenseNumber",
      label: "License Number",
      type: FieldType.Input,
    },
    {
      name: "licenseExpiryDate",
      label: "License Expiry Date",
      type: FieldType.Date,
    },
    // {
    //   name: "emergencyContactName",
    //   label: "Emergency Contact Name",
    //   type: FieldType.Input,
    // },
    // {
    //   name: "emergencyContactPhone",
    //   label: "Emergency Contact Phone",
    //   type: FieldType.Phone,
    // },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: FieldType.Date,
      rules: [{ required: true, message: "" }],
    },
    {
      name: "address",
      label: "Address",
      type: FieldType.Textarea,
      placeholder: "Enter address",
      rows: 2,
      className: "w-full!",
    },
    {
      name: "note",
      label: "Note",
      type: FieldType.Textarea,
      rows: 2,
      className: "w-full!",
    },
    {
      name: "profileImage",
      label: "",
      type: FieldType.hidden,
      hidden: true,
      value: image,
    },
  ];

  return {
    getTableColumns,
    getCommonFormFields,
    getFormFields,
  };
};
