// //server
// import express from 'express';
// import type { Application } from 'express'
// import { ApolloServer } from '@apollo/server';
// //middleware
// import cors from 'cors';
// import morgan from 'morgan'
// import { WebSocketServer } from 'ws'
// import { createServer } from 'http'
// //
// // import {useServer} from 'graphql-ws/lib/use/ws';
// // import { expressMiddleware } from '@apollo/server/express4';
// //env
// import 'dotenv/config'
// //jwt
// import jwt from 'jsonwebtoken';
// import 'dotenv/config';


// const app: Application = express();
// const port = process.env.PORT || 3000;

// // Apollo Server setup
// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// async function startServer() {
//   await server.start();

// //   app.use(expressMiddleware(server, {
// //     // Add Apollo Server middleware options here if needed
// //   }));
  

//   // Express middleware
//   app.use(cors());
//   app.use(morgan('dev'));
//   app.use(express.json());


//   // Start listening
//   app.listen(port, () => {
//     console.log(`Express app is listening on http://localhost:${port}`);
//   });
// }

// startServer().catch((error) => {
//   console.error('Error starting the server:', error);
// });











