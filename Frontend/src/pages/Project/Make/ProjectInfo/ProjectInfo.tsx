import { css } from "@emotion/react";
import React from "react";
import InputForm from "./InputForm";

function ProjectInfo() {
    return (
        <article css={style}>
            <h1>프로젝트 정보 입력</h1>
            <p className="description">프로젝트를 생성하기 위한 정보들을 작성해주세요.</p>
            <InputForm />
        </article>
    );
}

const style = css`
    .form {
        margin-top: 1rem;
    }

    @media screen and (min-width: 1096px){
        max-width: 700px;
    }
    @media screen and (max-width: 1095px){
        width: 100%;
    }
`;

export default ProjectInfo;