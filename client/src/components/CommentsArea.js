import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";

import CommentItem from "./CommentItem";
import { IS_LOGGED_IN, GET_ALL_BLOGENTRIES, ME } from "../gql/query";
import { ADD_COMMENT } from "../gql/mutation";

function CommentsArea({ comments, userId, entryId }) {
    const { data: ili, loading, error } = useQuery(IS_LOGGED_IN);
    const [values, setValues] = useState({
        content: "",
        entry: ""
    });
    const [submit, setSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const onChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        });
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && submit) {
            addComment(values);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.content) {
            errors.content = "Geben Sie einen Kommentar ein."
        }
        return errors;
    }

    const [addComment] = useMutation(ADD_COMMENT, {
        variables: {
            input: {
                content: values.content,
                entryId
            }
        },
        refetchQueries: [{ query: GET_ALL_BLOGENTRIES }, { query: ME }],
        awaitRefetchQueries: true,
        onCompleted: () => {
            setValues({
                content: "",
                entry: ""
            })
        },
        onError: (error) => {
            setErrorMessage(error.message)
        }
    });

    const buttonAddComment = (evt) => {
        evt.preventDefault();
        setFormErrors(validate(values));
        setSubmit(true);
    }

    if (loading) {
        return <span>Loading...</span>
    }
    return (
        <>
            {ili.isLoggedIn ? (
                <>
                    <h3>Neuen Kommentar eingeben</h3>
                    {<form style={{ width: "100%" }}>
                        <div className="d-flex align-items-center row px-2">
                            <div className="form-group col-10">
                                <textarea className="form-control me-5" rows="3" name="content" placeholder="Kommentar hier eingeben" value={values.content} onChange={onChange} />
                                <div className="text-danger">{formErrors.content}</div>
                            </div>
                            <div className="col">
                                <button className="btn btn-success" onClick={buttonAddComment}>Eingeben</button>
                            </div>
                        </div>
                        <label style={{ color: "red" }}>{errorMessage}</label>
                    </form>}
                </>
            ) : (
                <>
                    <div>Sie müssen sich anmelden um zu kommentieren!</div>
                </>
            )}
            <div>
                {comments ? (
                    <>
                        {comments.map(comment => {
                            return <CommentItem key={comment.id} comment={comment} userId={userId} />
                        })}
                    </>
                ) : null}
            </div>
        </>
    )
}

export default CommentsArea