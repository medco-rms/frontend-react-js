import type { User, UserRole } from "@/assets/models";
import { useUser } from "./useUser";
import { useEffect, useState } from "react";
import {
  FormGenerator,
  ImagePreview,
  useApiQuery,
} from "react-project-scaffold-ts";
import { staticImages } from "@/lib/static-images";
import { useParams } from "react-router-dom";
import { getRoleLabel } from ".";
import dayjs from "dayjs";
import { USER_MUTATION, USER_QUERY } from "./gql";
import type { FormInstance } from "antd";

const Index = ({ role }: { role: UserRole }) => {
  const { getFormFields } = useUser();
  const [image, setImage] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const { id } = useParams<{ role?: string; id?: string }>();
  const normalizedRole = (role?.toUpperCase() ?? role ?? "DOCTOR") as UserRole;
  const roleLabel = getRoleLabel(role ?? role);

  const { data: apiData, isLoading } = useApiQuery<User>(
    [USER_QUERY],
    USER_QUERY,
    Boolean(id),
    { id },
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
  };

  useEffect(() => {
    if (apiData) {
      const payload: User = { ...apiData.user };
      payload.dateOfBirth = dayjs(payload.dateOfBirth).toDate();
      setData(payload);
    }
  }, [apiData]);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({ image, includeId: id ? true : false, role })}
        title={id ? `Edit ${roleLabel}` : `Create new ${roleLabel}`}
        backTo={`/admin/${role.toLowerCase()}/index`}
        apiRoute={USER_MUTATION(!id)}
        payloadExtraData={{
          role: normalizedRole,
        }}
        leftContent={
          <ImagePreview
            onImageSelect={setImage}
            defaultImage={staticImages.noPhotoBoyImg}
          />
        }
        data={data}
        isFetching={isLoading}
        isCreate={!id}
      />
    </div>
  );
};

export const StaffForm = ({
  id,
  formInstance,
  onSubmit,
}: {
  id?: string | undefined;
  formInstance: FormInstance;
  onSubmit: () => void;
}) => {
  const { getFormFields } = useUser();
  const [data, setData] = useState<any>(null);

  const { data: apiData, isLoading } = useApiQuery<User>(
    [USER_QUERY],
    USER_QUERY,
    Boolean(id),
    { id },
  ) as {
    data: Record<string, any> | undefined;
    isLoading: boolean;
  };

  useEffect(() => {
    if (apiData) {
      const payload: User = { ...apiData.user };
      setData(payload);
    }
  }, [apiData]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          image: "",
          includeId: id ? true : false,
          role: "STAFF",
        })}
        title={id ? `Edit Staff` : `Create new Staff`}
        backTo="/admin/staff/index"
        apiRoute={USER_MUTATION(!id)}
        payloadExtraData={{
          role: "STAFF",
        }}
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

export default Index;
