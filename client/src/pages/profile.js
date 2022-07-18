import React, { useEffect, useState } from 'react'
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { IS_LOGGED_IN, PROFILE, GET_ALL_BLOGENTRIES } from "../gql/query";
import { DELETE_ENTRY, DELETE_COMMENT } from '../gql/mutation';
import DeleteIcon from "../../public/img/delete.svg";
import EditIcon from "../../public/img/edit.svg";
import styles from "../styles/messageBox.module.css";
import LoadingSpinner from '../components/LoadingSpinner';

function Profile() {
    const navigate = useNavigate();
    const { data: ili } = useQuery(IS_LOGGED_IN);
    const { data, loading, error } = useQuery(PROFILE);
    const [showEntryMessageBox, setShowEntryMessageBox] = useState(false);
    const [showCommentMessageBox, setShowCommentMessageBox] = useState(false);
    const [entryObj, setEntryObj] = useState({
        id: "",
        title: ""
    });
    const [commentId, setCommentId] = useState({ id: "" });

    const [deleteEntry] = useMutation(DELETE_ENTRY);
    const [deleteComment] = useMutation(DELETE_COMMENT);

    useEffect(() => {
        if (!ili.isLoggedIn) {
            navigate("/");
        }
    }, [ili]);

    const handleEntryDeleteButton = (entry) => {
        setEntryObj({ id: entry.id, title: entry.title });
        setShowEntryMessageBox(true);
    }

    const handleCommentDeleteButton = (comment) => {
        setCommentId({ id: comment.id });
        setShowCommentMessageBox(true);
    }

    const abortEntryDelete = () => {
        setEntryObj({ id: "", title: "" });
        setShowEntryMessageBox(false);
    }

    const confirmEntryDelete = () => {
        deleteEntry({
            variables: {
                id: entryObj.id
            },
            refetchQueries: [{ query: PROFILE }, { query: GET_ALL_BLOGENTRIES }],
            awaitRefetchQueries: true,
        });
        abortEntryDelete();
    }

    const abortCommentDelete = () => {
        setCommentId({ id: "" });
        setShowCommentMessageBox(false);
    }

    const confirmCommentDelete = () => {
        deleteComment({
            variables: {
                id: commentId.id
            },
            refetchQueries: [{ query: PROFILE }, { query: GET_ALL_BLOGENTRIES }],
            awaitRefetchQueries: true
        });
        abortCommentDelete();
    }

    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <span>Error!!!</span>
    }

    return (
        <div>
            {showEntryMessageBox && (
                <div className={styles.overlay}>
                    <div className={styles.messageBox}>
                        <p className={styles.messageBoxText}>Wollen Sie den Blogeintrag mit den Titel "{entryObj.title}" wirklich löschen?</p>
                        <div className={styles.buttonContainer}>
                            <button type="button" className="btn btn-danger" onClick={confirmEntryDelete}>Ja</button>
                            <button type="button" className="btn btn-secondary" onClick={abortEntryDelete}>Nein</button>
                        </div>
                    </div>
                </div>
            )}
            {showCommentMessageBox && (
                <div className={styles.overlay}>
                    <div className={styles.messageBox}>
                        <p className={styles.messageBoxText}>Wollen Sie diesen Kommentar wirklich löschen?</p>
                        <div className={styles.buttonContainer}>
                            <button type="button" className="btn btn-danger" onClick={confirmCommentDelete}>Ja</button>
                            <button type="button" className="btn btn-secondary" onClick={abortCommentDelete}>Nein</button>
                        </div>
                    </div>
                </div>
            )}
            <h2>Hallo, {data.me.user.username}</h2>
            <div className="my-3">
                <p>Blogeinträge <span style={{ fontWeight: "bold" }}>{data.me.entryList.length}</span> </p>
                {data.me.entryList && data.me.entryList.map((entry) => {
                    return <div key={entry.id} className="row border rounded my-2 p-3 bg-light align-items-center">
                        <div className="col d-flex flex-column">
                            <span style={{ fontSize: "12px", fontStyle: "italic" }} className="text-info">erstellt am</span>
                            <span>{format(parseISO(entry.createdAt), 'dd.MM.yyyy')}</span>
                        </div>
                        <div className="col-6 d-flex flex-column">
                            <span style={{ fontSize: "12px", fontStyle: "italic" }} className="text-info">Titel</span>
                            <span>{entry.title}</span>
                        </div>
                        <div className="col-3">
                            <Link to={`/editEntry/${entry.id}`}>
                                <img style={{ width: "20px", height: "20px", cursor: "pointer" }} className="mx-4" src={EditIcon} alt="Edit" />
                            </Link>
                            <img style={{ width: "20px", height: "20px", cursor: "pointer" }} className="mx-4" src={DeleteIcon} alt="Delete" onClick={() => handleEntryDeleteButton(entry)} />
                        </div>
                    </div>
                })}
            </div>
            <div className="my-3">
                <p>Kommentare <span style={{ fontWeight: "bold" }}>{data.me.commentList.length}</span></p>
                {data.me.commentList && data.me.commentList.map((comment) => {
                    return <div key={comment.id} className="row border rounded my-2 p-3 bg-light align-items-center">
                        <div className="col d-flex flex-column">
                            <span style={{ fontSize: "12px", fontStyle: "italic" }} className="text-info">erstellt am</span>
                            <span>{format(parseISO(comment.createdAt), 'dd.MM.yyyy, hh:mm:ss')}</span>

                        </div>
                        <div className="col-6 d-flex flex-column">
                            <span style={{ fontSize: "12px", fontStyle: "italic" }} className="text-info">Kommentar</span>
                            <span>{comment.content}</span>
                        </div>
                        <div className="col-3">
                            <img style={{ width: "20px", height: "20px", cursor: "pointer" }} className="mx-4" src={DeleteIcon} alt="Delete" onClick={() => handleCommentDeleteButton(comment)} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Profile