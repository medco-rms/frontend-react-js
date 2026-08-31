import { Icon } from "@iconify-icon/react";
import dayjs from "dayjs";
import {
  type FieldConfig,
  FieldType,
  UserProfileInfo,
  useUtils,
} from "react-project-scaffold-ts";
import { type Gender, type Patient } from "@/assets/models";

export const usePatient = () => {
  const { GetFormattedIds, ServerDate } = useUtils({});

  const getTableColumns = ({
    onClick,
  }: {
    onClick?: (patient: Patient) => void;
  }): any[] => [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (_: string, record: Patient) => (
        <UserProfileInfo
          full_name={`${record.firstName} ${record.middleName ?? ""}`}
          photoUrl=""
          onClick={() => onClick?.(record)}
        />
      ),
    },
    {
      title: "Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
      render: (val?: string) => (val ? GetFormattedIds(val, "PAT") : "-"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (val?: Gender) => val || "-",
    },
    {
      title: "Phone #",
      dataIndex: "phone",
      key: "phone",
      render: (val?: string) => val || "-",
    },
    {
      title: "Card # Expiry Date",
      dataIndex: "cardNumberExpiryDate",
      key: "cardNumberExpiryDate",
      render: (val: string) => (
        <span className="text-sm">
          {val ? dayjs(val).format("D MMM, YYYY") : "-"}
        </span>
      ),
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
        placeholder: "e.g. Michael",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "gender",
        label: "Gender",
        type: FieldType.Select,
        placeholder: "Select Gender",
        prefix: <Icon icon="solar:users-group-rounded-outline" />,
        options: [
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
        ],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: FieldType.Date,
        placeholder: "Select date of birth",
        suffix: <Icon icon="solar:calendar-outline" />,
        rules: [{ required: true, message: "" }],
        disabledDate: (current: any) =>
          current.isAfter(ServerDate?.serverTime, "day"),
      },
      {
        name: "bloodGroup",
        label: "Blood Group",
        type: FieldType.Select,
        placeholder: "Select blood group",
        options: [
          { label: "O+", value: "O+" },
          { label: "O-", value: "O-" },
          { label: "A+", value: "A+" },
          { label: "A-", value: "A-" },
          { label: "B+", value: "B+" },
          { label: "B-", value: "B-" },
          { label: "AB+", value: "AB+" },
          { label: "AB-", value: "AB-" },
        ],
      },
      {
        name: "phone",
        label: "Phone Number",
        type: FieldType.Phone,
        rules: [{ required: true, message: "" }],
      },

      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: FieldType.Input,
        placeholder: "e.g. Jane Doe",
      },
      {
        name: "emergencyContactPhone",
        label: "Emergency Contact Phone",
        type: FieldType.Phone,
        placeholder: "000 000 0000",
      },
      {
        name: "nationalID",
        label: "National ID",
        type: FieldType.number,
        placeholder: "e.g. 123456789",
        numberProps: {
          controls: false,
          stringMode: true,
          formatValue: false,
        },
      },
      {
        name: "address",
        label: "Address",
        type: FieldType.Textarea,
        placeholder: "Enter address",
        rows: 2,
        className: "w-full!",
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
    includeId = false,
  }: {
    includeId?: boolean;
  }): FieldConfig[] => [...getCommonFormFields(includeId)];

  return {
    getTableColumns,
    getCommonFormFields,
    getFormFields,
  };
};
