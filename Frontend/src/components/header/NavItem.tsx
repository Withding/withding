import styled from "@emotion/styled";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import NavItemType from "../types/NavItemType";

function NavItem(props: NavItemType) {
    const isDeskTop = useMediaQuery({ query: "(min-width: 1096px)" });
    return (
        <Item>
            <p>
                {!isDeskTop && props.icon}
            </p>
            <p>{isDeskTop ? props.deskTopName : props.mobileName}</p>
        </Item>
    );
}

const Item = React.memo(styled.li`
    cursor: pointer;
    @media screen and (min-width: 1096px) {
        padding: 1rem;
    }

    @media screen and (max-width: 1095px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--grey-400);
        font-weight: 600;
        svg {
            font-size: 1.5rem;
        }

        .add {
            transform: scale(1.4);
        }
    }
`);

export default NavItem;