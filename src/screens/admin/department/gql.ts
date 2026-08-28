import { gql } from "graphql-request";

const Fields = `
    id
    name
    type
    description
    createdAt
`;

export const DEPARTMENT_MUTATION = (isCreate: boolean) =>
  isCreate
    ? gql`
        mutation CreateDepartment($input: CreateDepartmentDto!) {
          createDepartment(input: $input) {
            ${Fields}
          }
        }
      `
    : gql`
        mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentDto!) {
          updateDepartment(id: $id, input: $input) {
            ${Fields}
          }
        }
      `;

export const DEPARTMENTS_QUERY = () => gql`
    query departments {
      departments {
        ${Fields}
      }
    }
  `;
export const DEPARTMENT_QUERY = gql`
        query department($id: ID!) {
          department(id: $id) {
            ${Fields}
          }
        }
      `;
