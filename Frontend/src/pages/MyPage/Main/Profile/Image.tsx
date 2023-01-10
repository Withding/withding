import BaseProps from "@/types/BaseProps";
import { css } from "@emotion/react";
import React from "react";
import { GrEdit } from "react-icons/gr";

interface ImageProps {
    src?: string;
    isEdit?: boolean;
}

/**
 * 프로필 이미지 컴포넌트
 * @param props.src - 프로필 이미지
 * @param props.isEdit - 프로필 이미지 수정 가능 여부
 * @returns 
 */
function Image(props: BaseProps & ImageProps) {
    return (
        <figure css={style}>
            <img src={props.src} alt="Image loading fail..." />
            {props.isEdit && <button className="edit-btn"><GrEdit /></button>}
        </figure>
    );
}

const style = css`
    background-color: red;
    border-radius: 100%;
    display: flex;
    align-items: flex-end;
    text-align: center;
    img {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .edit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        padding: 0.3rem;
        border: 1px solid var(--grey-300);
        font-size: 0.7rem;
        background: var(--white);
        cursor: pointer;
    }

    @media screen and (min-width: 1096px) {
        width: 76px;
        height: 76px;        
    }

    @media screen and (max-width: 1095px) {
        width: 62px;
        height: 62px;
    }
`;

export default Image;