import { gql } from "graphql-request";

const Fields = `
    id
    firstName
    middleName
    cardNumber
    gender
    dateOfBirth
    phone
    address
    bloodGroup
    emergencyContactName
    emergencyContactPhone
    nationalID
    cardNumberExpiryDate
`;

export const PATIENT_MUTATION = (isCreate: boolean) =>
  isCreate
    ? gql`
        mutation CreatePatient($input: CreatePatientDto!) {
          createPatient(input: $input) {
            ${Fields}
          }
        }
      `
    : gql`
        mutation UpdatePatient($id: ID!, $input: UpdatePatientDto!) {
          updatePatient(id: $id, input: $input) {
            ${Fields}
          }
        }
      `;

export const PATIENTS_QUERY = gql`
  query Get_Patients {
    patients {
      id
      firstName
      middleName
      gender
      phone
      cardNumber
      cardNumberExpiryDate
    }
  }
`;
export const PATIENT_QUERY = gql`
        query patient($id: ID!) {
          patient(id: $id) {
            ${Fields}
          }
        }
      `;
