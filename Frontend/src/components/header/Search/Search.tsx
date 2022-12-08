import React from "react";
import SearchForm from "./SearchForm";
import BaseProps from "../../types/BaseProps";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Search(props: BaseProps) {
    return (
        <SearchForm
            className={props.className}
        />
    );
}

export default Search;