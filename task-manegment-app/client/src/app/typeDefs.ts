import { gql } from '@apollo/client';

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String!
    password: String
    token: String
    message: String
  }
  type UserForLogin {
    id: String!
    username: String!
    email: String!
    password_hash: String!
    }
  extend type Query {
    isLoggedIn: Boolean!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    }

  
  type AuthResponseSignIn {
    success: Boolean!
    token: String! 
    user: User!
    message: String 
  }

  type RegisterResponse {
  success: Boolean!
  user: User
  message: String
}


  extend type Mutation {
    signIn(email: String!, password: String!): AuthResponseSignIn!
    signUp(registerInput: RegisterInput!): RegisterResponse!
    signOut: Boolean!
  }
  
`;


export const SIGN_UP_MUTATION = gql`mutation StamMutation($username: String!,$email:String! $password: String!) {
  signUp(username:$username,email:$email,password:$password){
      success
      user {
        email
        password
        username
      }
      message
    }
}`

export const SIGN_IN_MUTATION = gql`mutation signIn($email:String! $password: String!) {
  signIn(email:$email,password:$password){
      success
      user {
         id 
        email
        username
      }
      token
      message
    }
}`


export default typeDefs;
