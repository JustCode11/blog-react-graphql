import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { isLoggedInVar } from '../config/cache';
import { ME } from "../gql/query";
import { LOGIN } from "../gql/mutation";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [submit, setSubmit] = useState(false);
    const onChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        });
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && submit) {
            login(values);
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // Email
        if (!values.email) {
            errors.email = "Geben Sie eine Email Adresse ein.";
        }
        else if (!emailRegex.test(values.email)) {
            errors.email = "Das ist keine valide Email Adresse.";
        }
        // Password
        if (!values.password) {
            errors.password = "Geben Sie ein Passwort ein.";
        }
        return errors;
    }

    const [login] = useMutation(LOGIN, {
        variables: {
            input: {
                ...values
            }
        },
        refetchQueries: [{ query: ME }],
        awaitRefetchQueries: true,
        onCompleted: () => {
            isLoggedInVar(true);
            navigate("/");
        },
        onError: (error) => {
            setErrorMessage(error.message);
        }
    });

    const buttonLogin = (evt) => {
        evt.preventDefault();
        setFormErrors(validate(values));
        setSubmit(true);
    }
    return (
        <div className="mt-5 bg-light p-4 border rounded">
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email Adresse</label>
                    <input className="form-control" type="text" name="email" placeholder="Email" onChange={onChange} />
                    <p className="text-danger">{formErrors.email}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passwort</label>
                    <input className="form-control" type="password" name="password" placeholder="Passwort" onChange={onChange} />
                    <p className="text-danger">{formErrors.password}</p>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary mx-auto" onClick={buttonLogin}>Anmelden</button>
                </div>
                <p style={{ color: "red" }}>{errorMessage}</p>
            </form>
            <div>
                Noch keinen Account? <Link to="/signup">Hier registrieren</Link>
            </div>
        </div>
    )
}

export default Login;