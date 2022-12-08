import styled from "@emotion/styled";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import Notice from "../Notice/Notice";
import Search from "../Search/Search";

function SearchHeader() {
    const { pathname } = useLocation();
    const isMobile = useMediaQuery({ query: "(max-width: 1095px)" });
    const isMain = pathname.startsWith("/main");
    return (
        <Div
            isRender={isMobile && isMain}
        >
            <Search />
            <Notice className="notice" />
        </Div>
    );
}

const Div = styled.div<{ isRender: boolean }>`
    
    @media screen and (min-width: 1096px) { 
        & > .notice {
            display: none;
        }
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        display: ${props => props.isRender ? "flex" : "none"};
        flex-direction: row;
    }
`;

export default SearchHeader;