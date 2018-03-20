require('dotenv').config();
const axios = require('axios');
const graphql = require('graphql');

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`${process.env.JSON_SERVER}/users/${args.id}`)
          .then(response => response.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
