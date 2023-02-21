import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router-dom";
import Notice from "../Notice/Notice";
import Search from "../Search/Search";

function SearchHeader() {
    const { pathname } = useLocation();
    const isMain = pathname.startsWith("/main");
    return (
        <Div
            isRender={isMain}
        >
            <Search />
            <Notice className="notice" />
        </Div>
    );
}

const Div = styled.div<{ isRender: boolean }>`
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 1096px) { 
        display: inline-flex;
        margin-right: 1rem;
        
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        display: ${props => props.isRender ? "flex" : "none"};
        flex-direction: row;
    }
`;

export default SearchHeader;