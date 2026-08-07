import { useState } from "react";
import { useUser } from "../useUser";
import type { User } from "@/assets/models";
import { Table } from "react-project-scaffold-ts";
// import { Index as List } from "react-project-scaffold-ts";

const Index = () => {
  const { getTableColumns } = useUser();
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <Table
        columns={getTableColumns({
          onClick: (doctor: User) => {},
        })}
        searchByCols={["first_name", "last_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by Doctor information (first name, last name, email & phone number)"
        }
        route={"Doctor"}
        addButtonTitle={"Create Doctor"}
        actionPrevilage={{
          edit: true,
          delete: true,
        }}
        queryBy={
          [
            // {
            //   type: "BRANCH",
            //   value: undefined,
            // },
          ]
        }
        loading={loading}
        reloadKey={reloadKey}
        name="Doctor"
      />
    </>
  );
};

export default Index;
