"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var dayjs = require("dayjs");
var graphql_1 = require("graphql");
var language_1 = require("graphql/language");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar TheDate\n\n  type Query {\n    tomorrow(date: TheDate!): TheDate!\n    yesterday(date: TheDate!): TheDate!\n  }\n"], ["\n  scalar TheDate\n\n  type Query {\n    tomorrow(date: TheDate!): TheDate!\n    yesterday(date: TheDate!): TheDate!\n  }\n"])));
var resolvers = {
    Query: {
        tomorrow: function (_, _a) {
            var date = _a.date;
            return date.add(1, "day");
        },
        yesterday: function (_, _a) {
            var date = _a.date;
            return date.subtract(1, "day");
        }
    },
    TheDate: new graphql_1.GraphQLScalarType({
        name: "MyDate",
        description: "Custom description for the date scalar.",
        parseValue: function (value) {
            return dayjs(value);
        },
        serialize: function (value) {
            return dayjs(value).format("MM-DD-YYYY");
        },
        parseLiteral: function (ast) {
            if (ast.kind === language_1.Kind.STRING) {
                return dayjs(ast.value);
            }
            return null;
        }
    })
};
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Apollo Server ready at " + url);
});
var templateObject_1;
