import React, { useState } from 'react'
import { format, parseISO } from "date-fns";
import Collapse from 'react-bootstrap/Collapse';

import CommentsArea from "./CommentsArea";

function BlogItem({ entry }) {
    const [showComments, setShowComments] = useState(false);

    const commentHandler = () => {
        setShowComments(!showComments);
    }
    return (
        <div className="bg-light rounded p-3 my-3">
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h4>{entry.title}</h4>
                    <div>
                        {entry.tags ? entry.tags.map((tag) => {
                            return <span className="bg-warning rounded px-2 mx-1 text-uppercase" key={tag.id}>{tag.description}</span>
                        }) : null}
                    </div>
                </div>
                <div style={{ fontSize: "14px" }}>
                    <span>Von <span style={{ color: "#009ACD" }}>{entry.user.username}</span></span>
                    <span> erstellt am {format(parseISO(entry.createdAt), 'dd.MM.yyyy')}</span>
                </div>
            </div>
            <div className="my-3 bg-white" style={{ whiteSpace: "pre-wrap", borderBottom: "1px solid #ccc", padding: "5px 8px" }}>
                {entry.content}
            </div>
            <div>
                <div>{entry.comments.length} {entry.comments.length == 1 ? <>Kommentar</> : <>Kommentare</>}</div>
                <div className="d-flex justify-content-center">
                    <div onClick={commentHandler}
                        style={{ cursor: "pointer" }}
                        aria-expanded={showComments}
                        aria-controls="collapseComments"
                    >{showComments ? <>Schließen {"\u21E1"}</> : <>Öffnen {"\u21E3"}</>}</div>
                </div>
                <Collapse in={showComments}>
                    <div className="mt-4">
                        <CommentsArea comments={entry.comments} userId={entry.user.id} entryId={entry.id} />
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default BlogItem