import BaseProps from "@/types/BaseProps";
import { css } from "@emotion/react";
import React from "react";
import MenuItem from "./MenuItem";


/**
 * 메뉴 리스트
 * @returns 
 */
function MenuList(props: BaseProps) {
    const menuItems = [
        { id: 0, name: "서포터" },
        { id: 1, name: "메이커" }
    ];
    return (
        <ul
            className={`${props.className} `}
            css={style}
        >
            {menuItems.map((item) => (
                <MenuItem
                    key={item.id}
                    id={item.id}>
                    {item.name}
                </MenuItem>
            ))}
        </ul>
    );
}

const style = css`
    display: inline-flex;
    justify-content: flex-end;
    z-index: 3;
    width: 100%;
`;

export default MenuList;