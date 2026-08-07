import type { User } from "@/assets/models";
import { gql } from "graphql-request";
import { useApiQuery } from "react-project-scaffold-ts";

const Index = () => {
  const USERS_QUERY = gql`
    query {
      users {
        id
        firstName
        middleName
        lastName
        email
        phone
        role
      }
    }
  `;

  const users = useApiQuery<User[]>(["users"], USERS_QUERY);

  return (
    <div className="flex justify-center items-center h-full w-full bg-amber-200">
      <span className="text-white">Dashboard Page</span>
    </div>
  );
};

export default Index;
