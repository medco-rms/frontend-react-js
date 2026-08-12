import { gql } from "graphql-request";

const Fields = `
    id
    firstName
    middleName
    lastName
    gender
    dateOfBirth
    email
    phone
    alternativePhone
    address
    specialization
    education
    employeeId
    licenseNumber
    licenseExpiryDate
    joiningDate
    experienceYears
    note
`;

export const USER_MUTATION = (isCreate: boolean) =>
  isCreate
    ? gql`
        mutation CreateUser($input: CreateUserDto!) {
          createUser(input: $input) {
            ${Fields}
          }
        }
      `
    : gql`
        mutation UpdateUser($id: ID!, $input: UpdateUserDto!) {
          updateUser(id: $id, input: $input) {
            ${Fields}
          }
        }
      `;

export const USERS_QUERY = (roleAlias: string) => gql`
    query UsersByRole($role: String!) {
      ${roleAlias}: filterUser(role: $role)  {
        id
        firstName
        middleName
        lastName
        gender
        email
        employeeId
        joiningDate
        specialization
        education
        status
      }
    }
  `;
export const USER_QUERY = gql`
        query user($id: ID!) {
          user(id: $id) {
            ${Fields}
          }
        }
      `;
