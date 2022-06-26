import { ApolloProvider } from "@apollo/client";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import useApolloClient from "./config/client";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AddEntry from "./pages/addEntry";
import Profile from "./pages/profile";
import EditEntry from "./pages/editEntry";

const App = () => {
    const client = useApolloClient();
    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/addEntry" element={<AddEntry />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/editEntry/:id" element={<EditEntry />} />
                    </Routes>
                </Layout>
            </Router>
        </ApolloProvider>
    )
};

export default App;