import { gql } from '@apollo/client';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  type AuthResponse {
    success: Boolean!
    token: String 
    user: User 
    errorMessage: String 
  }
  
  extend type Mutation {
    signIn(email: String!, password: String!): AuthResponse!
    signUp(email: String!, password: String!,username:String!): AuthResponse!
    signOut: Boolean!
  }
  
`;

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      token
      user {
        id
        username
      }
      errorMessage
    }
  }
`

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!,$username: String!) {
    signUp(email: $email, password: $password,username: $username) {
      success
      token
      user {
        id
        username
      }
      errorMessage
    }
  }
`


export default typeDefs;
