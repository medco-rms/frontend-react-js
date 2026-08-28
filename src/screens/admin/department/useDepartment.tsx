import { type FieldConfig, FieldType } from "react-project-scaffold-ts";

export const useDepartment = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value: Date) => new Date(value).toLocaleDateString(),
      },
    ];
  };

  const getFormFields = ({
    includeId = false,
  }: {
    includeId?: boolean;
  }): FieldConfig[] => {
    const fields: FieldConfig[] = [
      {
        name: "name",
        label: "Name",
        type: FieldType.Input,
        placeholder: "e.g. Examination",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "type",
        label: "Type",
        type: FieldType.Select,
        placeholder: "Select Department Type",
        options: [
          { label: "EXAMINATION", value: "EXAMINATION" },
          { label: "LAB", value: "LAB" },
          { label: "SCAN", value: "SCAN " },
          { label: "PHARMACY", value: "PHARMACY" },
          { label: "OTHER", value: "OTHER" },
        ],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "description",
        label: "Description",
        type: FieldType.Textarea,
        placeholder: "Enter department description",
        rows: 4,
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

  return {
    getTableColumns,
    getFormFields,
  };
};
