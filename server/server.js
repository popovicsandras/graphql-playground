import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { User } from './db.js';
import { resolvers } from './resolvers.js'

const PORT = 9000;
const JWT_SECRET = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), express.json(), expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JWT_SECRET,
}));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne((user) => user.email === email);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });  
  } else {
    res.sendStatus(401);
  }
});

const typeDefs = readFileSync('./schema.graphql', 'utf-8');
const context = async ({ req }) => {
  const user = await User.findById(req.auth?.sub);
  return { user };
}; 
const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(apolloServer, {context}));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Graphql endpoint is on http://localhost:${PORT}/graphql`);
});
