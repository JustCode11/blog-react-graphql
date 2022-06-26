const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../datasources/mongodb/models");

const loaders = require("./loaders");
const getUser = require("./utils");

const corsOptions = {
    origin: process.env.NODE_ENV !== 'development' ? 'http://localhost:1234' : '*',
    credentials: true
}

async function gqlServer(app) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        validationRules: [depthLimit(7), createComplexityLimitRule(1500)],
        context: async ({ req, res }) => {
            const token = req.cookies.authToken;
            const user = await getUser(token);
            return { models, loaders, user, res }
        }
    });

    await server.start();
    server.applyMiddleware({
        app,
        path: "/api",
        cors: corsOptions
    });
}

module.exports = gqlServer;