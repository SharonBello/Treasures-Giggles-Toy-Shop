import { Search } from "../services/svg.service.js";
import React, { useState } from "react";
import { SearchResults } from "./SearchResults.jsx";

export function SearchSite(props) {
    const [searchResults, setSearchResults] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const onSearchChange = ({ target }) => {
        const field = target.txt
        let { searchTerm } = target
        let { filterBy } = props
        if (field === '') setSearchTerm([target.searchTerm])
        filterBy = { ...filterBy, [field]: searchTerm }
        props.setFilter(filterBy)
    }

    const updateSearchResults = ({ searchTerm, searchResults }) => {
        let { value } = searchTerm
        if (searchTerm === '') value = [searchTerm.value]
        searchResults = { [searchTerm]: value }
        setSearchResults.push(searchResults)
    }

    return (
        <section>
            <div className="search-form-container"></div>
            <form className="search-form">
                <input className="search-input"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    // ref={searchTerm}
                    onChange={() => onSearchChange({ searchTerm })} />
                <button onSubmit={() => updateSearchResults({ searchTerm, searchResults })}
                    className="search-button">
                    <div className="search-icon"><Search />
                    </div>
                    <SearchResults searchResults={searchResults} />
                </button>
            </form>

        </section>
    );
}
