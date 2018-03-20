const graphql = require('graphql');

const {
  GraphQLInt,
  GraphQLObjectType,
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
