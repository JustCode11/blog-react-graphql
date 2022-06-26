import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { isLoggedInVar } from "../config/cache";
import { ME, IS_LOGGED_IN } from "../gql/query";
import { LOGOUT } from "../gql/mutation";

function Header() {
    const { data, loading } = useQuery(ME);
    const { data: ili } = useQuery(IS_LOGGED_IN);

    const [logout] = useMutation(LOGOUT, {
        onCompleted: () => {
            isLoggedInVar(false);
        }
    });

    const buttonLogout = () => {
        logout({
            variables: {
                email: data.me.user.email
            }
        });
    }
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <header className="navbar navbar-expand-lg navbar-light px-4 py-3 d-flex justify-content-between" style={{ backgroundColor: "#ccc" }}>
            <div className="d-flex justify-content-center">
                <Link className="navbar-brand" to="/">Programmierer Blog</Link>
                {ili.isLoggedIn ? (
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/addEntry">Neuer Blogeintrag</Link>
                        </li>
                    </ul>
                ) : null}
            </div>
            <div>
                {ili.isLoggedIn ? (
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">{data.me.user.username}</Link>
                        </li>
                        <li className="nav-item">
                            <a role="button" className="nav-link" onClick={buttonLogout}>Abmelden</a>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Anmelden</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Registrieren</Link>
                        </li>
                    </ul>
                )}

            </div>
        </header>
    )
}

export default Header