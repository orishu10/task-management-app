import express from 'express';
import { ApolloServer } from "@apollo/server";
import * as path from 'path';
//middleware
import cors from 'cors';
import morgan from 'morgan'
import { WebSocketServer } from 'ws'
//npm services
import { createServer } from "http";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from 'body-parser';
//gql
import typeDefs from '././graphql/typeDefs';
import resolvers  from '././graphql/resolvers/reslovers'
//DB
import {connectToDB} from './DB'
//env
import 'dotenv/config'
//
import {findUserByEmail} from './dal/usersDal';
import { GraphQLError } from 'graphql';


const app = express();


// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));


// app.post('/signup', userRegister);

const port = process.env.PORT || 3333;

interface MyContext {
    // we'd define the properties a user should have
    // in a separate user interface (e.g., email, id, url, etc.)
    user: String;
  }

const corsOptions = {
    credentials: true 
};

app.use(cors(corsOptions))
app.use(morgan("dev"))

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await wsServerCleanup.dispose();
                    },
                };
            },
        },
    ],
});

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});

const wsServerCleanup = useServer({ schema }, wsServer);
(async function () {
    // starting the apollo server to expose endoint to client
    await apolloServer.start();
    app.use("/graphql", bodyParser.json(), expressMiddleware(apolloServer, 
        {
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            // Try to retrieve a user with the token
            const user = await findUserByEmail(token);
            if (!user)
            // throwing a `GraphQLError` here allows us to specify an HTTP status code,
            // standard `Error`s will have a 500 status code by default
            throw new GraphQLError('User is not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
              },
            });
        
            // Add the user to the context
            return { user };
        }}
        ));
})();


httpServer.listen(port, () => {
connectToDB()
  console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
    console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${port}/subscriptions`
    );
});



