import type { FormInstance } from "antd";
import { useEffect, useState } from "react";
import { FormGenerator, useApiQuery } from "react-project-scaffold-ts";
import { useDepartment } from "../department/useDepartment";
import { useRoom } from "../room/useRoom";

const DepartmentSharedForm = ({
  id,
  formInstance,
  onSubmit,
  query_string,
  mutation_string,
  names,
}: {
  id?: string | undefined;
  formInstance: FormInstance;
  onSubmit: () => void;
  query_string: string;
  mutation_string: string;
  names: {
    getData: string;
    Label: string;
  };
}) => {
  const [data, setData] = useState<any>(null);
  const { getFormFields } = useDepartment();

  const { data: apiData, isLoading } = useApiQuery<any>(
    [query_string],
    query_string,
    Boolean(id),
    { id },
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
  };
  console.log(
    "%csrc/screens/shared/form.tsx:37 names",
    "color: #007acc;",
    names,
  );

  useEffect(() => {
    if (apiData) {
      const payload: any = { ...apiData[names.getData] };
      setData(payload);
    }
  }, [apiData, names.getData]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          includeId: Boolean(id),
        })}
        title={id ? `Edit ${names.Label}` : `Create new ${names.Label}`}
        apiRoute={mutation_string}
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

const RoomSharedForm = ({
  id,
  formInstance,
  onSubmit,
  query_string,
  mutation_string,
  names,
}: {
  id?: string | undefined;
  formInstance: FormInstance;
  onSubmit: () => void;
  query_string: string;
  mutation_string: string;
  names: {
    getData: string;
    Label: string;
  };
}) => {
  const [data, setData] = useState<any>(null);
  const { getFormFields, isLoading: optionsLoading } = useRoom();

  const { data: apiData, isLoading } = useApiQuery<any>(
    [query_string],
    query_string,
    Boolean(id),
    { id },
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
  };

  useEffect(() => {
    if (apiData) {
      const payload: any = { ...apiData[names.getData] };
      setData(payload);
    }
  }, [apiData, names.getData]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          includeId: Boolean(id),
        })}
        title={id ? `Edit ${names.Label}` : `Create new ${names.Label}`}
        apiRoute={mutation_string}
        data={data}
        isFetching={isLoading || optionsLoading}
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

export const SharedForm = ({
  id,
  formInstance,
  onSubmit,
  query_string,
  mutation_string,
  names,
  type,
}: {
  id?: string | undefined;
  formInstance: FormInstance;
  onSubmit: () => void;
  query_string: string;
  mutation_string: string;
  names: {
    getData: string;
    Label: string;
  };
  type: "dep" | "room";
}) => {
  if (type === "dep") {
    return (
      <DepartmentSharedForm
        id={id}
        formInstance={formInstance}
        onSubmit={onSubmit}
        query_string={query_string}
        mutation_string={mutation_string}
        names={names}
      />
    );
  }

  return (
    <RoomSharedForm
      id={id}
      formInstance={formInstance}
      onSubmit={onSubmit}
      query_string={query_string}
      mutation_string={mutation_string}
      names={names}
    />
  );
};
