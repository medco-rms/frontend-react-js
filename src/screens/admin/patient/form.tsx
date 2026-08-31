import type { Patient, User } from "@/assets/models";
import { usePatient } from "./usePatient";
import { useEffect, useState } from "react";
import {
  FormGenerator,
  useApiQuery,
  useUtils,
} from "react-project-scaffold-ts";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { PATIENT_MUTATION, PATIENT_QUERY } from "./gql";

const Index = () => {
  const { getFormFields } = usePatient();
  const { ServerDate } = useUtils({});
  const [data, setData] = useState<any>(null);

  const { id } = useParams<{ role?: string; id?: string }>();

  const { data: apiData, isLoading } = useApiQuery<User>(
    [PATIENT_QUERY],
    PATIENT_QUERY,
    Boolean(id),
    { id },
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
  };

  useEffect(() => {
    if (apiData) {
      const payload: Patient = { ...apiData.patient };
      payload.dateOfBirth = dayjs(payload.dateOfBirth).toDate();
      setData(payload);
    }
  }, [apiData]);

  const defaultCardExpiryDate = dayjs(ServerDate?.serverTime).add(3, "month");

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({})}
        title={id ? `Edit Patient` : `Create new Patient`}
        backTo="/admin/patients"
        apiRoute={PATIENT_MUTATION(!id)}
        payloadExtraData={{
          cardNumberExpiryDate: defaultCardExpiryDate,
        }}
        data={data}
        isFetching={isLoading}
        isCreate={!id}
      />
    </div>
  );
};

export default Index;
