import React from 'react';
import { useQuery } from "@apollo/client";

import { GET_ALL_BLOGENTRIES } from "../gql/query";
import SearchBar from "../components/SearchBar";
import AllEntriesContainer from '../components/AllEntriesContainer';

function Home() {
    const { data, loading, error, fetchMore, refetch } = useQuery(GET_ALL_BLOGENTRIES);

    const loadMoreEntries = () => {
        fetchMore({
            variables: {
                cursor: data.entries.cursor
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                return {
                    entries: {
                        cursor: fetchMoreResult.entries.cursor,
                        hasNextPage: fetchMoreResult.entries.hasNextPage,
                        entries: [
                            ...prev.entries.entries,
                            ...fetchMoreResult.entries.entries
                        ],
                        __typename: 'entries'
                    }
                }
            }
        })
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error...</p>
    }
    console.log("[home] data: ", data);
    return (
        <>
            <h1>Programmierer Blog</h1>
            <div>
                <SearchBar refetch={refetch} />
                <AllEntriesContainer entries={data.entries.entries} />
                {data.entries.hasNextPage && (
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" type="button" onClick={loadMoreEntries}>Mehr Einträge laden</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;