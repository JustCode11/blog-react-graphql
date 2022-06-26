import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";

import { GET_ALL_TAGS, IS_LOGGED_IN, GET_ALL_BLOGENTRIES } from "../gql/query";
import { ADD_ENTRY } from "../gql/mutation";

function AddEntry() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        title: "",
        content: ""
    });
    const [tags, setTags] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [submit, setSubmit] = useState(false);
    const { data, loading, error } = useQuery(GET_ALL_TAGS);
    const { data: ili } = useQuery(IS_LOGGED_IN);

    useEffect(() => {
        if (!ili.isLoggedIn) {
            navigate("/");
        }
        if (Object.keys(formErrors).length === 0 && submit) {
            addEntry();
        }
    }, [formErrors, ili]);

    const validate = (values) => {
        const errors = {};
        // Title
        if (!values.title) {
            errors.title = "Geben Sie einen Titel ein.";
        }
        // Content
        if (!values.content) {
            errors.content = "Geben Sie einen Inhalt ein.";
        }
        return errors;
    }

    const onChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        });
    }

    const handleCheckbox = (evt) => {
        if (evt.target.checked) {
            setTags(oldTags => [...oldTags, evt.target.value]);
        } else {
            let checkTag = evt.target.value;
            let arr = tags.filter(tag => tag !== checkTag);
            setTags(arr);
        }
    }

    const [addEntry] = useMutation(ADD_ENTRY, {
        variables: {
            input: {
                title: values.title,
                content: values.content,
                tags
            }
        },
        refetchQueries: [{ query: GET_ALL_BLOGENTRIES }],
        awaitRefetchQueries: true,
        onCompleted: () => {
            navigate("/");
        },
        onError: (error) => {
            setErrorMessage(error.message);
        }
    });

    const buttonAddEntry = (evt) => {
        evt.preventDefault();
        setFormErrors(validate(values));
        setSubmit(true);
    }

    return (
        <div className="mt-5 bg-light p-4 border rounded">
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="title">Titel</label>
                    <input className="form-control" type="text" name="title" placeholder="Titel" onChange={onChange} />
                    <div className="text-danger">{formErrors.title}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="content">Inhalt</label>
                    <textarea className="form-control" rows="6" name="content" placeholder="Hier kommt der Inhalt rein." onChange={onChange} />
                    <div className="text-danger">{formErrors.content}</div>
                </div>
                <div className="form-group mb-3">
                    {loading ? <div>Loading...</div> : data.tags ? (
                        data.tags.map(tag => {
                            return (
                                <div key={tag.id} className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id={tag.description} value={tag.id} onChange={handleCheckbox} />
                                    <label className="form-check-label" htmlFor={tag.description}>{tag.description}</label>
                                </div>
                            )
                        })) : null}
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary mx-auto" onClick={buttonAddEntry}>Erstellen</button>
                </div>
                <div className="text-danger">{errorMessage}</div>
            </form>
        </div>
    )
}

export default AddEntry