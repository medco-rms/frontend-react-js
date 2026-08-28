import { Button, Form } from "antd";
import { useContext, useState } from "react";
import { Table, UtilContext } from "react-project-scaffold-ts";
import { DEPARTMENT_MUTATION, DEPARTMENT_QUERY } from "../department/gql";
import { useDepartment } from "../department/useDepartment";
import { ROOM_MUTATION, ROOM_QUERY } from "../room/gql";
import { useRoom } from "../room/useRoom";
import { SharedForm } from "./form";

export type propsType = {
  searchByCols: string[];
  searchInputPlaceholderText: string;
  names: {
    getData: string;
    deleteData: string;
    popupLabel: string;
  };
  route: {
    api: any;
    route?: string;
  };
  type: "dep" | "room";
};

const DepartmentIndex = (props: propsType) => {
  const [form] = Form.useForm();
  const { getTableColumns } = useDepartment();
  const { setDrawerProps } = useContext(UtilContext);
  const [reloadKey, setReloadKey] = useState(0);

  const OpenSharedForm = ({ id }: { id?: string | undefined }) => {
    form.resetFields();
    setDrawerProps((prev) => ({
      ...prev,
      open: true,
      title: "",
      width: 450,
      children: (
        <SharedForm
          key={id ?? "new"}
          id={id}
          formInstance={form}
          onSubmit={() => {
            setDrawerProps((prev: any) => ({ ...prev, open: false }));
            setReloadKey((prev) => prev + 1);
          }}
          query_string={DEPARTMENT_QUERY}
          mutation_string={DEPARTMENT_MUTATION(!id)}
          names={{
            getData: "department",
            Label: "Department",
          }}
          type="dep"
        />
      ),
      footer: (
        <Button
          type="primary"
          className="w-full h-10!"
          onClick={() => {
            form.submit();
          }}
        >
          {id ? "Save Changes" : "Create"}
        </Button>
      ),
    }));
  };

  return (
    <Table
      columns={getTableColumns()}
      searchByCols={props.searchByCols}
      searchInputPlaceholderText={props.searchInputPlaceholderText}
      route={{
        api: props.route?.api,
        page: ``,
      }}
      showAddButton={true}
      addButtonTitle={`Create new ${props.names.popupLabel}`}
      onAddButtonClicked={() => {
        OpenSharedForm({ id: undefined });
      }}
      actionPrevilage={{
        edit: {
          show: true,
          onClick: (record: any) => {
            OpenSharedForm({ id: record?.id });
          },
        },
        delete: { show: true },
      }}
      name={props.names}
      reloadKey={reloadKey}
    />
  );
};

const RoomIndex = (props: propsType) => {
  const [form] = Form.useForm();
  const { getTableColumns } = useRoom();
  const { setDrawerProps } = useContext(UtilContext);
  const [reloadKey, setReloadKey] = useState(0);

  const OpenSharedForm = ({ id }: { id?: string | undefined }) => {
    form.resetFields();
    setDrawerProps((prev) => ({
      ...prev,
      open: true,
      title: "",
      width: 450,
      children: (
        <SharedForm
          key={id ?? "new"}
          id={id}
          formInstance={form}
          onSubmit={() => {
            setDrawerProps((prev: any) => ({ ...prev, open: false }));
            setReloadKey((prev) => prev + 1);
          }}
          query_string={ROOM_QUERY}
          mutation_string={ROOM_MUTATION(!id)}
          names={{
            getData: "room",
            Label: "Room",
          }}
          type="room"
        />
      ),
      footer: (
        <Button
          type="primary"
          className="w-full h-10!"
          onClick={() => {
            form.submit();
          }}
        >
          {id ? "Save Changes" : "Create"}
        </Button>
      ),
    }));
  };

  return (
    <Table
      columns={getTableColumns()}
      searchByCols={props.searchByCols}
      searchInputPlaceholderText={props.searchInputPlaceholderText}
      route={{
        api: props.route?.api,
        page: ``,
      }}
      showAddButton={true}
      addButtonTitle={`Create new ${props.names.popupLabel}`}
      onAddButtonClicked={() => {
        OpenSharedForm({ id: undefined });
      }}
      actionPrevilage={{
        edit: {
          show: true,
          onClick: (record: any) => {
            OpenSharedForm({ id: record?.id });
          },
        },
        delete: { show: true },
      }}
      name={props.names}
      reloadKey={reloadKey}
    />
  );
};

const Index = (props: propsType) => {
  if (props.type === "dep") {
    return <DepartmentIndex {...props} />;
  }

  return <RoomIndex {...props} />;
};

export default Index;
