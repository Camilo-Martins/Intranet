import { gql } from "@apollo/client";

const LOGIN = gql`
mutation Login($input: AuthInput) {
  authUser(input: $input) {
    token
  }
}
`
/* ADMIN
STUDENT
TEACHER
PRINCIPAL
ASSISTANT
COORDINATOR */

const GET_USER = gql`
query GetToken {
  getToken {
    id
    name
    lastName
    email
    create
    rol  
  }
}
`

export {LOGIN, GET_USER}