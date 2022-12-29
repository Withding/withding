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
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.isSelected ? "var(--white)" : "var(--green-200)"};
    border: ${props => props.isSelected ? "1px solid var(--grey-200)" : ""};   
    color: ${props => props.isSelected ? "var(--black)" : "var(--white)"};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: ${props => props.isSelected ? "none" : "1px solid var(--grey-200)"};
    font-weight: 400;
`;

export default React.memo(MenuItem);