// import Button from "@/components/common/Button";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

interface RelationButtonProps {
    isRelation: boolean;
    onClick: () => void;
}

/**
 * 관계 여부 버튼
 * @param props 
 * @returns 
 */
function RelationButton(props: RelationButtonProps) {
    return (
        <Button
            isRelation={props.isRelation}
            value={""}
            onClick={props.onClick}
        />
    );
}


const Button = styled.button<{ isRelation: boolean }>`

    cursor: pointer;
    border-radius: 8px;

    padding: 0.5rem;
    border: 1px solid var(--blue-300);
    color: var(--blue-300);
    font-size: 0.8rem;

    &:hover {
        background-color: var(--blue-50);
        transition: 0.5s;
    }


    &::before {
        content: "${props => props.isRelation ? "팔로우중" : "팔로우 하기"}"
    }

    &:hover::before {
        content: "${props => props.isRelation ? "언팔로우 하기" : "팔로우 하기"}"
    }
`;
export default RelationButton;