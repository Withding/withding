import { css } from "@emotion/react";
import * as React from "react";
import CreateButton from "./CreateButton";
import Login from "./Login";
import MobileDynamicHeader from "./MobileDynamicHeader";
import Nav from "./Nav";
import PCHeader from "./PCHeader";

function Header() {
    return (
        <header css={defaultStyle}>
            <Nav />
            <div className="right">
                <PCHeader />
                <MobileDynamicHeader />
                <Login className="login" />
                <CreateButton className="create-btn" />
            </div>
        </header>
    );
}

const defaultStyle = css`
    z-index: 999;
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
    }

    @media screen and (max-width: 1095px) {
        position: fixed;
        & > .right { // right 사이즈 100%
            width: 100%;
        }
        & > .right > .login, & > .right > .create-btn {
            display: none;
        }
    }
`;

export default Header;