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

export const PROFILE_MUTATION = (isCreate: boolean) =>
  isCreate
    ? gql`
        mutation CreateProfile($input: CreateProfileDto!) {
          createProfile(input: $input) {
            ${Fields}
          }
        }
      `
    : gql`
        mutation UpdateProfile($id: ID!, $input: UpdateProfileDto!) {
          updateProfile(id: $id, input: $input) {
            ${Fields}
          }
        }
      `;

export const PROFILES_QUERY = (roleAlias: string) => gql`
    query ProfilesByRole($role: String!) {
      ${roleAlias}: filterProfile(role: $role)  {
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
export const PROFILE_QUERY = gql`
        query Profile($id: ID!) {
          Profile(id: $id) {
            ${Fields}
          }
        }
      `;
