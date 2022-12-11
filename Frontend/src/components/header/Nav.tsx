import { css } from "@emotion/react";
import NavItemType from "../../types/NavItemType";
import { useMediaQuery } from "react-responsive";
import Logo from "../common/Logo";
import NavItem from "./NavItem";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMemo } from "react";


function Nav() {
    const isDesktop = useMediaQuery({ query: "(min-width: 1096px)" });
    const navigator = useNavigate();
    const menuOnClickHandler = useCallback((route: string) => {
        navigator(route);
    }, [navigator]);
    const navItems: NavItemType[] = useMemo(() => [
        {
            name: "홈",
            show: "mobile",
            route: "/main",
            icon: <AiOutlineHome />,
            onClick: () => menuOnClickHandler("/main")
        },
        {
            name: "펀딩",
            show: "all",
            route: "/funding",
            icon: <BiDonateBlood />,
            onClick: () => menuOnClickHandler("/funding")
        },
        {
            name: "오픈예정",
            show: "pc",
            route: "/commingsoon",
            icon: null,
            onClick: () => menuOnClickHandler("/commingsoon")
        },
        {
            name: "",
            show: "mobile",
            route: "/QQQ",
            icon: <AiOutlinePlusCircle className="add" />,
            onClick: () => { /** */ }
        },
        {
            name: "찜하기",
            show: "mobile",
            route: "/like",
            icon: <AiOutlineHeart />,
            onClick: () => menuOnClickHandler("/like")
        },
        {
            name: "마이페이지",
            show: "mobile",
            route: "/mypage",
            icon: <AiOutlineUser />,
            onClick: () => menuOnClickHandler("/mypage")
        },
    ], [menuOnClickHandler]);

    const deskTopItems = useMemo(() => navItems.filter(item => item.show !== "mobile"), [navItems]);
    const mobileItems = useMemo(() => navItems.filter(item => item.show !== "pc"), [navItems]);

    return (
        <nav>
            <ul css={[defaultStyle, mobileStyle]}>
                {isDesktop && <Logo />}
                {isDesktop && deskTopItems.map((item, index) => (
                    <NavItem
                        onClick={item.onClick}
                        key={index}
                        {...item}
                    />
                ))}
                {!isDesktop && mobileItems.map((item, index) => (
                    <NavItem
                        onClick={item.onClick}
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