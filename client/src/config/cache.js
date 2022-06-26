import { InMemoryCache, makeVar } from "@apollo/client";
import Cookies from "js-cookie";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                }
            }
        }
    }
});
const isLoggedInVar = makeVar(!!Cookies.get('authToken'));

module.exports = { cache, isLoggedInVar };