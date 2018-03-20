const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: process.env.NODE_ENV === 'development',
}));

app.listen(4000, () => {
  console.log('Listening');
});
