import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String
    password: String
    token: String
  }
  type UserForLogin {
    id: String!
    username: String!
    email: String!
    password_hash: String!
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
} 

  type RegisterResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    user: User!
  }
  type Mutation {
  signUp(username:String!,email:String!,password:String!):RegisterResponse!
  signIn(email:String!,password:String!):LoginResponse!
}
`;

export default typeDefs;
