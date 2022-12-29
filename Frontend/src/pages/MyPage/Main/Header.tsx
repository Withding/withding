import { css } from "@emotion/react";
import React from "react";
import BaseProps from "@/types/BaseProps";
import MenuList from "./MenuList";
import Backdrop from "./Backdrop";
/**
 * content header
 * @returns 
 */
function Header(props: BaseProps) {
    return (
        <header
            css={style}
            className={props.className}
        >
            <Backdrop />
            <MenuList
                className="menus"
            />
        </header>
    );
}

const style = css`
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;

    // Desktop
    @media screen and (min-width: 1096px) {
        align-items: center; // 메뉴를 리스트를 가운대에 오기위해 사용
        .menus {
            margin-top: 3rem;
        }
    }

    @media screen and (max-width: 1095px) {
        position: fixed;
        width: 100%;
        top: 4rem;
        justify-content: flex-end;
        .menus {
            position: absolute;
        }
    }
`;

export default Header;