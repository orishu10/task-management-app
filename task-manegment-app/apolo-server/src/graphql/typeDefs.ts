import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String!
    password: String!
    token: String
    message: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
   
  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUser(id: String): User
    user: User 
    usersName: User
    users: [User!]
} 

  type RegisterResponse {
    success: Boolean!
    user: User
    token: String
    errorMessage: String
  }

  type LoginResponse {
    success: Boolean!
    errorMessage: String
  }
  type Mutation {
  registerUser(registerInput: RegisterInput!): RegisterResponse!
  loginUser(loginInput: LoginInput!): LoginResponse!
}
`;

export default typeDefs;
