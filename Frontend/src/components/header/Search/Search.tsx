import React from "react";
import SearchForm from "./SearchForm";
import BaseProps from "../../types/BaseProps";

function Search(props: BaseProps) {
    return (
        <SearchForm
            className={props.className}
        />
    );
}

export default Search;