import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

import { IS_LOGGED_IN, GET_ALL_TAGS, GET_BLOGENTRY, ME } from "../gql/query";
import { EDIT_ENTRY } from "../gql/mutation";


function EditEntry() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        title: "",
        content: ""
    });
    const [tags, setTags] = useState([]);
    const { data: ili } = useQuery(IS_LOGGED_IN);
    const { data: tagsData, loading: tagsLoading, error: tagsError } = useQuery(GET_ALL_TAGS);
    const { data, loading, error } = useQuery(GET_BLOGENTRY, {
        variables: {
            id
        },
        onCompleted: (data) => {
            setValues({
                title: data.entry.title,
                content: data.entry.content
            });
            const allTagIds = data.entry.tags.map(element => element.id);
            setTags(allTagIds);
        }
    });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        if (!ili.isLoggedIn) {
            navigate("/");
        }
        if (submit) {
            editEntry();
        }
    }, [formErrors, ili]);

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

    const [editEntry] = useMutation(EDIT_ENTRY, {
        variables: {
            id,
            input: {
                title: values.title,
                content: values.content,
                tags
            }
        },
        refetchQueries: [{ query: ME }],
        awaitRefetchQueries: true,
        onCompleted: () => {
            navigate("/profile");
        },
        onError: (error) => {
            setErrorMessage(error.message);
        }
    })

    const buttonEditEntry = (evt) => {
        evt.preventDefault();
        setSubmit(true);
        editEntry();
    }

    if (loading) {
        return <span>Laden...</span>
    }
    if (error) {
        return <span>Error!</span>
    }
    console.log("id: ", id);
    console.log("data: ", data);
    console.log("edit tags: ", tags);
    //console.log(...tags);
    return (
        <div className="mt-5 bg-light p-4 border rounded">
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="title">Titel</label>
                    <input className="form-control" type="text" name="title" placeholder="Titel" value={values.title} onChange={onChange} />
                    <div className="text-danger">{formErrors.title}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="content">Inhalt</label>
                    <textarea className="form-control" rows="6" name="content" placeholder="Hier kommt der Inhalt rein." value={values.content} onChange={onChange} />
                    <div className="text-danger">{formErrors.content}</div>
                </div>
                <div className="form-group mb-3">
                    {tagsLoading ? <div>Loading...</div> : tagsData.tags ? (
                        tagsData.tags.map(tag => {
                            const checked = tags.includes(tag.id) ? true : false;
                            return (
                                <div key={tag.id} className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id={tag.description} value={tag.id} onChange={handleCheckbox} checked={checked} />
                                    <label className="form-check-label" htmlFor={tag.description}>{tag.description}</label>
                                </div>
                            )
                        })) : null}
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary mx-auto me-4" onClick={buttonEditEntry}>Bearbeiten</button>
                    <Link to="/profile">
                        <button className="btn btn-secondary ms-4">Zurück</button>
                    </Link>
                </div>
                <div className="text-danger">{errorMessage}</div>
            </form>
        </div>
    )
}

export default EditEntry;