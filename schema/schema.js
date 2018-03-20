const axios = require('axios');
const graphql = require('graphql');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = graphql;

/* eslint-disable no-use-before-define */

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return axios
          .get(`${process.env.JSON_SERVER}/companies/${parentValue.id}/users`)
          .then(response => response.data);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue) {
        return axios
          .get(`${process.env.JSON_SERVER}/companies/${parentValue.companyId}`)
          .then(response => response.data);
      },
    },
  }),
});

/* eslint-enable no-use-before-define */

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
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`${process.env.JSON_SERVER}/companies/${args.id}`)
          .then(response => response.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const { firstName, age } = args;

        return axios
          .post(`${process.env.JSON_SERVER}/users`, { firstName, age })
          .then(response => response.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
