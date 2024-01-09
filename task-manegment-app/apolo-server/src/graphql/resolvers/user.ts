import user  from '../../graphql/typeDefs';
import { ApolloError } from 'apollo-server-errors';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}





