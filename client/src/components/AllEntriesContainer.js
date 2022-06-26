import React from 'react'

import BlogItem from "./BlogItem";

function AllEntriesContainer({ entries }) {
    return (
        <>
            {entries.length > 0 && entries.map((entry) => {
                return <BlogItem key={entry.id} entry={entry} />
            })}
        </>
    )
}

export default AllEntriesContainer