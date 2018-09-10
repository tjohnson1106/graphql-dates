import { ApolloServer, gql, IResolvers } from "apollo-server";
const dayjs = require("dayjs");
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const typeDefs = gql`
  scalar TheDate

  type Query {
    tomorrow(date: TheDate!): TheDate!
    yesterday(date: TheDate!): TheDate!
  }
`;

const resolvers: IResolvers = {
  Query: {
    tomorrow: (_, { date }) => {
      return date.add(1, "day");
    },

    yesterday: (_, { date }) => {
      return date.subtract(1, "day");
    }
  },

  TheDate: new GraphQLScalarType({
    name: "MyDate",
    description: "Custom description for the date scalar.",
    parseValue(value) {
      return dayjs(value);
    },
    serialize(value) {
      return dayjs(value).format("MM-DD-YYYY");
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return dayjs(ast.value);
      }
      return null;
    }
  })
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Apollo Server ready at ${url}`);
});
