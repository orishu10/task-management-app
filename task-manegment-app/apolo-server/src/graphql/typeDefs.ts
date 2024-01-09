import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
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
    getUser(id: ID!): User
    user: User  
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): RegisterResponse!
    loginUser(loginInput: LoginInput!): LoginResponse!
  }

  type RegisterResponse {
    success: Boolean!
    user: User
    errorMessage: String
  }

  type LoginResponse {
    success: Boolean!
    user: User
    errorMessage: String
  }
`;

export default typeDefs;
