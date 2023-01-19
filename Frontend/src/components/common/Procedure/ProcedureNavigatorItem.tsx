import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface ProcedureNavigatorItemProps {
    step: number;
    name: string;
    path: string;
    isSelected?: boolean;
}


/**
 * ProcedureNavigatorItem 컴포넌트 ( 메뉴 아이템 )
 * @param props.step - 에피소드 번호
 * @param props.name - 에피소드 이름
 * @param props.path - 클릭시 이동할 경로
 * @param props.isSelected - 선택된 에피소드인지 여부
 * @returns 
 */
function ProcedureNavigatorItem(props: ProcedureNavigatorItemProps) {
    const navigator = useNavigate();
    const onClickHandler = useCallback(() => {
        navigator(`${props.path}${props.step}`);
    }, [navigator, props.path, props.step]);
    return (
        <Item
            isSelected={props.isSelected ?? false}
            onClick={onClickHandler}
        >
            <h2>{props.name}</h2>
        </Item>
    );
}

const Item = styled.li<{
    isSelected: boolean;
}>`
    padding: 1rem 0;
    font-size: 0.8rem;
    cursor: pointer;
    color: ${({ isSelected }) => isSelected ? "var(--grey-500)" : "var(--grey-300)"};
`;

export default ProcedureNavigatorItem;