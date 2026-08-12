import { useUser } from "./useUser";
import type { User, UserRole } from "@/assets/models";
import { Table, UtilContext } from "react-project-scaffold-ts";
import { USERS_QUERY } from "./gql";
import { useContext } from "react";
import { Button, Form } from "antd";
import { StaffForm } from "./form";

export const getRoleLabel = (role?: string) =>
  role
    ?.toLowerCase()
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ") ?? "User";

const Index = ({ role }: { role: UserRole }) => {
  const [staffForm] = Form.useForm();

  const { getTableColumns } = useUser();

  const roleAlias = `${role?.toLowerCase() ?? "doctor"}s`;
  const roleLabel = getRoleLabel(role);

  const { setDrawerProps } = useContext(UtilContext);

  const OpenStaffForm = ({ id }: { id?: string | undefined }) => {
    staffForm.resetFields();
    setDrawerProps((prev) => ({
      ...prev,
      open: true,
      title: "",
      width: 450,
      children: (
        <StaffForm
          key={id ?? "new"}
          id={id}
          formInstance={staffForm}
          onSubmit={() => {
            setDrawerProps((prev: any) => ({ ...prev, open: false }));
          }}
        />
      ),
      footer: (
        <Button
          type="primary"
          className="w-full h-10!"
          onClick={() => {
            staffForm.submit();
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
        columns={getTableColumns({
          onClick: () => {},
          role,
        })}
        searchByCols={["firstName", "MiddleName", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by User information (first name, middle name, email & phone number)"
        }
        route={{
          api: USERS_QUERY(roleAlias),
          page: `/admin/${role.toLowerCase()}`,
        }}
        queryParams={{ role: role ?? "DOCTOR" }}
        showAddButton={true}
        addButtonTitle={`Create new ${roleLabel}`}
        onAddButtonClicked={
          role === "STAFF"
            ? () => {
                OpenStaffForm({ id: undefined });
              }
            : undefined
        }
        actionPrevilage={{
          edit: {
            show: true,
            onClick:
              role === "STAFF"
                ? (record: User) => {
                    OpenStaffForm({ id: record?.id });
                  }
                : undefined,
          },
          delete: { show: true },
        }}
        name={{
          getData: roleAlias,
          deleteData: "User",
          popupLabel: roleLabel,
        }}
      />
    </>
  );
};

export default Index;
