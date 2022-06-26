import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import Select from "react-select";

import { GET_ALL_TAGS } from "../gql/query";

function SearchBar({ refetch }) {
    const { data, loading, error } = useQuery(GET_ALL_TAGS);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const onTitleChange = (evt) => {
        setSearchTerm(evt.target.value);
    }
    const onTagChange = (selectedTag) => {
        setSelectedTag(selectedTag);
    }
    const searchHandler = () => {
        refetch({
            search: searchTerm,
            tag: selectedTag.value
        })
    }
    if (loading) {
        return <span>Loading...</span>;
    }
    let options = [{ value: "", label: "Alle" }];
    options.push(...data.tags.map(tag => {
        return { value: tag.id, label: tag.description }
    }));
    console.log("options: ", options);
    return (
        <div className="row mt-3 mb-4">
            <div className="col">
                <input className="form-control" type="text" placeholder="Suche nach Titel" onChange={onTitleChange} />
            </div>
            <div className="col">
                <Select defaultValue={options[0].value} options={options} value={selectedTag} onChange={onTagChange} />
            </div>
            <div className="col">
                <button type="button" className="btn btn-success" onClick={searchHandler}>Suchen</button>
            </div>
        </div>
    )
}

export default SearchBar