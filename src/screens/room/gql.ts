import { gql } from "graphql-request";

const Fields = `
    id
    name
    capacity
    status
    departmentId
    department
    createdAt
`;

export const ROOM_MUTATION = (isCreate: boolean) =>
  isCreate
    ? gql`
        mutation CreateRoom($input: CreateRoomDto!) {
          createRoom(input: $input) {
            ${Fields}
          }
        }
      `
    : gql`
        mutation UpdateRoom($id: ID!, $input: UpdateRoomDto!) {
          updateRoom(id: $id, input: $input) {
            ${Fields}
          }
        }
      `;

export const ROOMS_QUERY = () => gql`
    query rooms {
      rooms {
        ${Fields}
      }
    }
  `;
export const ROOM_QUERY = gql`
        query room($id: ID!) {
          room(id: $id) {
            ${Fields}
          }
        }
      `;
