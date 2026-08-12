import type { Department, User } from "@/assets/models";
import { useDepartment } from "./useDepartment";
import { useEffect, useState } from "react";
import { FormGenerator, useApiQuery } from "react-project-scaffold-ts";
import { DEPARTMENT_MUTATION, DEPARTMENT_QUERY } from "./gql";
import type { FormInstance } from "antd";

const DepartmentForm = ({
  id,
  formInstance,
  onSubmit,
}: {
  id?: string | undefined;
  formInstance: FormInstance;
  onSubmit: () => void;
}) => {
  const { getFormFields } = useDepartment();
  const [data, setData] = useState<any>(null);

  const { data: apiData, isLoading } = useApiQuery<User>(
    [DEPARTMENT_QUERY],
    DEPARTMENT_QUERY,
    Boolean(id),
    { id },
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
  };

  useEffect(() => {
    if (apiData) {
      const payload: Department = { ...apiData.department };
      setData(payload);
    }
  }, [apiData]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          includeId: id ? true : false,
        })}
        title={id ? `Edit Department` : `Create new Department`}
        backTo="/admin/department/index"
        apiRoute={DEPARTMENT_MUTATION(!id)}
        data={data}
        isFetching={isLoading}
        isCreate={!id}
        showFormButtons={false}
        formContainerClassNames={{
          upper: "m-0! p-0!",
          lower: "p-0!",
        }}
        formInstance={formInstance}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default DepartmentForm;
