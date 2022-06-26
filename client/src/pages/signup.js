import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { isLoggedInVar } from "../config/cache";
import { ME } from "../gql/query";
import { SIGNUP } from "../gql/mutation";

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [submit, setSubmit] = useState(false);
    const onChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        });
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && submit) {
            signup(values);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // Username
        if (!values.username) {
            errors.username = "Geben Sie einen Benutzernamen ein.";
        }
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
        if (!values.confirmPassword) {
            errors.confirmPassword = "Geben Sie ein Passwort ein."
        }
        if (values.password !== values.confirmPassword) {
            errors.password = "Die Passwörter stimmen nicht überein.";
            errors.confirmPassword = "Die Passwörter stimmen nicht überein.";
        }
        return errors;
    }

    const [signup] = useMutation(SIGNUP, {
        variables: {
            input: {
                username: values.username,
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password
            }
        },
        refetchQueries: [{ query: ME }],
        awaitRefetchQueries: true,
        onCompleted: () => {
            isLoggedInVar(true);
            navigate("/");
        },
        onError: (error) => {
            setErrorMessage(error.message)
        }
    });
    const buttonSignup = (evt) => {
        evt.preventDefault();
        setFormErrors(validate(values));
        setSubmit(true);
    }
    return (
        <div className="mt-5 bg-light p-4 border rounded">
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="username">Benutzername*</label>
                    <input className="form-control" type="text" name="username" placeholder="Benutzername" onChange={onChange} />
                    <div className="text-danger">{formErrors.username}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="firstname">Vorname</label>
                    <input className="form-control" type="text" name="firstname" placeholder="Vorname" onChange={onChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="lastname">Nachname</label>
                    <input className="form-control" type="text" name="lastname" placeholder="Nachname" onChange={onChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email*</label>
                    <input className="form-control" type="text" name="email" placeholder="Email" onChange={onChange} />
                    <div className="text-danger">{formErrors.email}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Passwort*</label>
                    <input className="form-control" type="password" name="password" placeholder="Passwort" onChange={onChange} />
                    <div className="text-danger">{formErrors.password}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Passwort wiederholen*</label>
                    <input className="form-control" type="password" name="confirmPassword" placeholder="Passwort wiederholen" onChange={onChange} />
                    <div className="text-danger">{formErrors.confirmPassword}</div>
                </div>
                <div style={{ fontSize: 12, fontStyle: 'italic' }}>
                    * Notwendige Eingaben
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary mx-auto" onClick={buttonSignup}>Registrieren</button>
                </div>
                <label style={{ color: "red" }}>{errorMessage}</label>
            </form>
            <div>
                Bereits registriert? <Link to="/login">Hier anmelden</Link>
            </div>
        </div>
    )
}

export default Signup