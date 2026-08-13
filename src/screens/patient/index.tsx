import { Table } from "react-project-scaffold-ts";
import { PATIENTS_QUERY } from "./gql";
import { usePatient } from "./usePatient";

const Index = () => {
  const { getTableColumns } = usePatient();

  return (
    <>
      <Table
        columns={getTableColumns({
          onClick: () => {},
        })}
        searchByCols={["firstName", "Middlename", "phone", "nationalID"]}
        searchInputPlaceholderText={
          "Search by Patent information (first name, middle name, phone & national ID)"
        }
        route={{
          api: PATIENTS_QUERY,
          page: `/admin/patients`,
        }}
        showAddButton={true}
        addButtonTitle={`Create new Patient`}
        actionPrevilage={{
          edit: {show: true},
          delete: {show: true},
        }}
        name={{
          getData: "patients",
          deleteData: "Patient",
          popupLabel: "Patient",
        }}
      />
    </>
  );
};

export default Index;
