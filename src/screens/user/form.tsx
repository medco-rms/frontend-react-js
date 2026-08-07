import type { UserRole } from "@/assets/models";
import { useUser } from "./useUser";
import { useState } from "react";
import { FormGenerator, ImagePreview } from "react-project-scaffold-ts";
import { staticImages } from "@/lib/static-images";

const Index = ({ role }: { role: UserRole }) => {
  const { getFormFields } = useUser();
  const [image, setImage] = useState<any>(null);
  return (
    // <div className="flex justify-center items-center h-full w-full">
    //   <span className="text-white">Doctor form Page</span>
    // </div>

    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({ image })}
        title="Create new Doctor"
        apiRoute="doctor"
        data={{}}
        leftContent={
          <ImagePreview
            onImageSelect={setImage}
            defaultImage={staticImages.noPhotoBoyImg}
          />
        }
      />
    </div>
  );
};

export default Index;
