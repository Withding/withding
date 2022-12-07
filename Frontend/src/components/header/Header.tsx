import { css } from "@emotion/react";
import * as React from "react";
import CreateButton from "./CreateButton";
import Login from "./Login";
import Nav from "./Nav";
import Notice from "./Notice/Notice";
import Search from "./Search/Search";
// import { useMediaQuery } from "react-responsive";


function Header() {
    // const isDeskTop = useMediaQuery({
    //     query: "(min-width: 1096px)"
    // });
    return (
        <header css={defaultStyle}>
            <Nav />
            <div className="right">
                <Search className="search" />
                <Notice className="notice" />
                <Login className="login" />
                <CreateButton className="create-btn" />
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


    .right {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    @media screen and (min-width: 1096px) {
        padding: var(--main-padding);
        & > .right > .notice {
            display: none;
        }
    }

    @media screen and (max-width: 1095px) {
        & > .right { // right 사이즈 100%
            width: 100%;
        }
        & > .right > .login, & > .right > .create-btn {
            display: none;
        }
    }
`;

export default Header;