import MyPageMainContext from "@/store/MyPageMainContext";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useCallback, useContext } from "react";


/**
 * 메뉴 아이템
 * @returns 
 */
function MenuItem(props: { children: React.ReactNode, id: number }) {
    const { currentMenu, onChangeMenu } = useContext(MyPageMainContext);
    const onClickHanler = useCallback(() => {
        onChangeMenu(props.id);
    }, [onChangeMenu, props.id]);
    return (
        <Item
            onClick={onClickHanler}
            isSelected={currentMenu === props.id}
        >
            {props.children}
        </Item>
    );
}

const Item = styled.li<{ isSelected: boolean }>`
    cursor: pointer;
    min-width: 5rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.isSelected ? "var(--white)" : "var(--grey-100)"};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border: ${props => props.isSelected ? "1px solid var(--grey-200)" : ""};    
`;

export default React.memo(MenuItem);