require('dotenv').config();
const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
}));

app.listen(4000, () => {
  console.log('Listening');
});
