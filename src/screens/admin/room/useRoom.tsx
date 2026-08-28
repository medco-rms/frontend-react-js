import type { Department } from "@/assets/models";
import {
  type FieldConfig,
  FieldType,
  useApiQuery,
} from "react-project-scaffold-ts";
import { gql } from "graphql-request";

export const useRoom = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Capacity",
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value: Date) => new Date(value).toLocaleDateString(),
      },
    ];
  };

  const DEPARTMENTS_QUERY = gql`
    query departments {
      departments {
        value: id
        label: name
      }
    }
  `;

  const { data: apiData, isLoading } = useApiQuery<Department[]>(
    [DEPARTMENTS_QUERY],
    DEPARTMENTS_QUERY,
    true,
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
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
        placeholder: "e.g. Room 01",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "capacity",
        label: "Capacity",
        type: FieldType.number,
        placeholder: "e.g. 4",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "departmentId",
        label: "Department",
        type: FieldType.Select,
        placeholder: "Select Department",
        options: apiData?.departments,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "status",
        label: "Status",
        type: FieldType.Select,
        placeholder: "Select Room Status",
        options: [
          { label: "AVAILABLE", value: "AVAILABLE" },
          { label: "BUSY", value: "BUSY" },
        ],
        rules: [{ required: true, message: "" }],
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
    isLoading,
  };
};
