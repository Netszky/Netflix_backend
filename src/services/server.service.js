const express = require('express');
const config = require("../configs");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const port = config.server.port;

const apiRouter = require('../routes');
const app = express();

const categorySchema = require('../apollo/schemas/categorySchema');
const userSchema = require('../apollo/schemas/userSchema');
const orderSchema = require('../apollo/schemas/orderSchema');
const profilSchema = require('../apollo/schemas/profilSchema');
const profilImageSchema = require ('../apollo/schemas/profilImageSchema');
const def = require('../apollo/resolvers');


const { ApolloServer } = require('apollo-server-express');
const movieSchema = require('../apollo/schemas/movieSchema');
const serieSchema = require('../apollo/schemas/serieSchema');
const personSchema = require('../apollo/schemas/personSchema');

const graphQlServer = new ApolloServer({
  typeDefs: [userSchema, orderSchema,categorySchema, movieSchema, serieSchema, personSchema, profilSchema, profilImageSchema],
  resolvers: def,
  context: ({ req }) => {
    const token = req.headers.authorization || 'no token';
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        return {
          userId : decodedToken.id
        };        
      }
      catch {
        return {
          auth: false,
          token: null,
          message:"not authorized"
        };
    }
  }
    else {
      return {
        auth: false,
        token: null,
        message: "No Token"
      }
    }

  },
})
graphQlServer.applyMiddleware({ app, path: '/graphql' });
app.use("*", cors());

// app.use(bodyParser.json());
app.use(function (req, res, next) {
  if (req.originalUrl === '/api/v1/webhooks/stripe') {
    next();
  } else {
    express.json()(req, res, next);
  }
});


app.use('/api/v1/', apiRouter);


exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};
