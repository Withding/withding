import BaseProps from "@/types/BaseProps";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { GrEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const goEditProfile = useCallback(() => {
        navigate("/mypage/myprofile");
    }, [navigate]);
    return (
        <figure css={style}>
            <img src={props.src} alt="Image loading fail..." />
            {props.isEdit && <button onClick={goEditProfile} className="edit-btn"><GrEdit /></button>}
        </figure>
    );
}

const style = css`
    display: flex;
    align-items: flex-end;
    text-align: center;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 100%;
    }

    .edit-btn {
        position: absolute;
        right: 0;
        display: inline-flex;
        align-items: center;
        border-radius: 50%;
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