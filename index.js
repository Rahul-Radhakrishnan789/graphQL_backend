const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');

const port = 4000;
const path = '/graphql'

const app = express()
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

const {typeDefs} = require('./schema/type-defs')

const {resolvers} = require("./schema/resolvers")

const { authMiddleware } = require('./middleware/userAuth'); 

async function startServer() {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path });
  }
  startServer();

app.listen(port, () => console.info(`Server started on port ${port}`));