import { type Gender, type UserRole } from "../../assets/models";
import { Icon } from "@iconify-icon/react";
import {
  type FieldConfig,
  FieldType,
  StatusIndicator,
  UserProfileInfo,
  useUtils,
} from "react-project-scaffold-ts";
import { type User } from "../../assets/models";

export const useUser = () => {
  const { GetFormattedIds, ServerDate } = useUtils({});
  const CommonTableColumns = ({
    onClick,
  }: {
    onClick?: (user: User) => void;
  }) => {
    return [
      {
        title: "Name",
        dataIndex: "firstName",
        key: "firstName",
        render: (_: string, record: User) => (
          <UserProfileInfo
            full_name={`${record?.firstName} ${record?.middleName ?? ""} ${
              record?.lastName ?? ""
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
        render: (val: number) => GetFormattedIds(String(val), "EMP"),
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (val?: Gender) => val || "-",
      },

      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (val?: string) => val || "-",
      },
    ];
  };

  const getTableColumns = ({
    onClick,
    role,
  }: {
    onClick?: (user: User) => void;
    role?: UserRole;
  }): any[] => {
    return role === "STAFF"
      ? [
          ...CommonTableColumns({ onClick }),
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (val: string) => (
              <StatusIndicator status={val.toLowerCase()} />
            ),
          },
        ]
      : [
          ...CommonTableColumns({ onClick }),
          {
            title: "Specialization",
            dataIndex: "specialization",
            key: "specialization",
          },
          {
            title: "Education",
            dataIndex: "education",
            key: "education",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (val: string) => (
              <StatusIndicator status={val.toLowerCase()} />
            ),
          },
        ];
  };

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
    role,
  }: {
    image?: string;
    includeId?: boolean;
    role?: UserRole;
  }): FieldConfig[] => {
    if (role === "STAFF") {
      const staffFields: FieldConfig[] = [];

      if (includeId) {
        staffFields.push({
          name: "id",
          type: FieldType.hidden,
          hidden: true,
          label: "",
        });
      }

      staffFields.push(
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
          name: "email",
          label: "Email",
          type: FieldType.email,
          placeholder: "someone@example.com",
          disabled: includeId,
          rules: [{ required: true, message: "" }],
        },
      );

      return staffFields;
    }

    const commonAndProfessionalFields: FieldConfig[] = [
      ...getCommonFormFields(includeId),
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: FieldType.Date,
        placeholder: "Select date of birth",
        suffix: <Icon icon="solar:calendar-outline" />,
        disabledDate: (current: any) =>
          current.isAfter(ServerDate?.serverTime, "day"),
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
        numberProps: {
          formatValue: true,
        },
        max: 50,
        min: 0,
      },
      {
        name: "licenseNumber",
        label: "License Number",
        type: FieldType.number,
        numberProps: {
          controls: false,
          stringMode: true,
          formatValue: false,
        },
      },
      {
        name: "licenseExpiryDate",
        label: "License Expiry Date",
        type: FieldType.Date,
      },
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

    return commonAndProfessionalFields;
  };

  return {
    getTableColumns,
    getCommonFormFields,
    getFormFields,
  };
};
