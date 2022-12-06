import { css } from "@emotion/react";
import * as React from "react";
import Nav from "./Nav";
// import { useMediaQuery } from "react-responsive";


function Header() {
    // const isDeskTop = useMediaQuery({
    //     query: "(min-width: 1096px)"
    // });
    return (
        <header css={defaultStyle}>
            <Nav />
        </header>
    );
}

const defaultStyle = css`
    width: 100%;
    
    min-height: 4rem;
    background-color: var(--white);
    display: flex;
    /* justify-content: center; */
    align-items: center;

    @media (min-width: 1096px) {
        padding: var(--main-padding);
    }
`;

export default Header;