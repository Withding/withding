import { css } from "@emotion/react";
import * as React from "react";
import Login from "./Login";
import Nav from "./Nav";
// import { useMediaQuery } from "react-responsive";


function Header() {
    // const isDeskTop = useMediaQuery({
    //     query: "(min-width: 1096px)"
    // });
    return (
        <header css={defaultStyle}>
            <Nav />
            <div>
                <Login />
            </div>
        </header>
    );
}

const defaultStyle = css`
    width: 100%;
    
    min-height: 4rem;
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 1096px) {
        padding: var(--main-padding);
    }
`;

export default Header;