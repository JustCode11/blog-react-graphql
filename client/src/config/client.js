import {
    ApolloClient,
    createHttpLink,
    gql
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";

const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`;

const uri = "http://localhost:8000/api";
const httpLink = createHttpLink({ uri, credentials: 'include' });

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            return console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const useApolloClient = () => {
    return new ApolloClient({
        link: errorLink.concat(httpLink),
        cache,
        typeDefs
    })
};

export default useApolloClient;
