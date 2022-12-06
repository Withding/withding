import { css } from "@emotion/react";
import * as React from "react";
import NavItemType from "../types/NavItemType";
import { useMediaQuery } from "react-responsive";
import Logo from "../common/Logo";
import NavItem from "./NavItem";

import { AiOutlineHome } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";

function Nav() {
    const isDesktop = useMediaQuery({ query: "(min-width: 1096px)" });
    const navItems: NavItemType[] = [
        { deskTopName: "", mobileName: "홈", link: "/", icon: <AiOutlineHome /> },
        { deskTopName: "펀딩", mobileName: "펀딩", link: "/funding", icon: <BiDonateBlood /> },
        { deskTopName: "", mobileName: "", link: "", icon: <AiOutlinePlusCircle className="add" /> },
        { deskTopName: "찜목록", mobileName: "찜하기", link: "/like", icon: <AiOutlineHeart /> },
        { deskTopName: "", mobileName: "마이페이지", link: "/mypage", icon: <AiOutlineUser /> },
    ];
    return (
        <nav>
            <ul css={[defaultStyle, mobileStyle]}>
                {isDesktop && <Logo />}
                {navItems.map((item, index) => (
                    <NavItem
                        key={index}
                        {...item}
                    />
                ))}
            </ul>
        </nav>
    );
}

const defaultStyle = css`
    width: 100%;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const mobileStyle = css`
    @media screen and (max-width: 1095px){
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 3rem;
        font-size: 0.8rem;
        background-color: var(--grey-100);
        box-shadow: 0 0 0.5rem var(--grey-300);
        justify-content: space-around;
    }
    
`;

export default Nav;