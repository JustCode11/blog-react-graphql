import React from 'react'
import { format, parseISO } from "date-fns";

function CommentItem({ comment, userId }) {
    return (
        <div className="p-2 border-info my-2 bg-white rounded">
            <div className="d-flex justify-content-between" style={{ fontSize: "14px" }}>
                <span>Von
                    <span style={{ color: "#009ACD" }}> {comment.user.username}</span>
                    {userId == comment.user.id ? <span style={{ color: "#8E236B" }}> [Ersteller]</span> : null}
                </span>
                <span> am {format(parseISO(comment.createdAt), 'dd.MM.yyyy, hh:mm:ss')}</span>
            </div>
            <div className="mt-3">
                {comment.content}
            </div>
        </div>
    )
}

export default CommentItem