import { Table, UtilContext } from "react-project-scaffold-ts";
import { DEPARTMENTS_QUERY } from "./gql";
import { useContext, useState } from "react";
import { Button, Form } from "antd";
import DepartmentForm from "./form";
import { useDepartment } from "./useDepartment";
import type { Department } from "@/assets/models";

const Index = () => {
  const [departmentForm] = Form.useForm();
  const { getTableColumns } = useDepartment();
  const { setDrawerProps } = useContext(UtilContext);
  const [reloadKey, setReloadKey] = useState(0);

  const OpenDepartmentForm = ({ id }: { id?: string | undefined }) => {
    departmentForm.resetFields();
    setDrawerProps((prev) => ({
      ...prev,
      open: true,
      title: "",
      width: 450,
      children: (
        <DepartmentForm
          key={id ?? "new"}
          id={id}
          formInstance={departmentForm}
          onSubmit={() => {
            setDrawerProps((prev: any) => ({ ...prev, open: false }));
            setReloadKey((prev) => prev + 1);
          }}
        />
      ),
      footer: (
        <Button
          type="primary"
          className="w-full h-10!"
          onClick={() => {
            departmentForm.submit();
          }}
        >
          {id ? "Save Changes" : "Create"}
        </Button>
      ),
    }));
  };

  return (
    <>
      <Table
        columns={getTableColumns()}
        searchByCols={["name", "type"]}
        searchInputPlaceholderText={"Search by name & type"}
        route={{
          api: DEPARTMENTS_QUERY(),
          page: ``,
        }}
        showAddButton={true}
        addButtonTitle={`Create new Department`}
        onAddButtonClicked={() => {
          OpenDepartmentForm({ id: undefined });
        }}
        actionPrevilage={{
          edit: {
            show: true,
            onClick: (record: Department) => {
              OpenDepartmentForm({ id: record?.id });
            },
          },
          delete: { show: true },
        }}
        name={{
          getData: "departments",
          deleteData: "Department",
          popupLabel: "Department",
        }}
        reloadKey={reloadKey}
      />
    </>
  );
};

export default Index;
