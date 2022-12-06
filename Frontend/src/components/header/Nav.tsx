import { css } from "@emotion/react";
import * as React from "react";
import NavItemType from "../types/NavItemType";
import { useMediaQuery } from "react-responsive";
import Logo from "../common/Logo";
import NavItem from "./NavItem";
// import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMemo } from "react";


function Nav() {
    const isDesktop = useMediaQuery({ query: "(min-width: 1096px)" });
    // const navigator = useNavigate();
    const navItems: NavItemType[] = useMemo(() => [
        { name: "홈", type: 2, route: "/", icon: <AiOutlineHome /> },
        { name: "펀딩", type: 3, route: "/funding", icon: <BiDonateBlood /> },
        { name: "오픈예정", type: 1, route: "/commingsoon", icon: null },
        { name: "", type: 2, route: "", icon: <AiOutlinePlusCircle className="add" /> },
        { name: "찜하기", type: 2, route: "/like", icon: <AiOutlineHeart /> },
        { name: "마이페이지", type: 2, route: "/mypage", icon: <AiOutlineUser /> },
    ], []);

    const deskTopItems = useMemo(() => navItems.filter(item => item.type !== 2), [navItems]);
    const mobileItems = useMemo(() => navItems.filter(item => item.type !== 1), [navItems]);

    return (
        <nav>
            <ul css={[defaultStyle, mobileStyle]}>
                {isDesktop && <Logo />}
                {isDesktop && deskTopItems.map((item, index) => (
                    <NavItem
                        key={index}
                        {...item}
                    />
                ))}
                {!isDesktop && mobileItems.map((item, index) => (
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
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const mobileStyle = css`
    @media screen and (max-width: 1095px){
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 4rem;
        font-size: 0.8rem;
        background-color: var(--grey-100);
        box-shadow: 0 0 0.5rem var(--grey-300);
        justify-content: space-around;
    }
    
`;

export default Nav;