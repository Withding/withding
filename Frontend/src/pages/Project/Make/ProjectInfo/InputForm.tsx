import { css } from "@emotion/react";
import React from "react";
import TitleInput from "./TitleInput";
import Category from "./Category";
import Amount from "./TargetAmount";
import BestImage from "./BestImage";
import Duration from "./Duration";


/**
 * 프로젝트 생성 정보를 입력받는 폼 컴포넌트
 * @returns 
 */
function InputForm() {
    return (
        <form css={style}>
            <TitleInput />
            <BestImage />
            <Category />
            <Amount />
            <Duration />
        </form>
    );
}

const style = css`
    width: 100%;
    section {
        margin-bottom: 2rem;
    }
    label {
        width: 100%;
        display: flex;
        flex-direction: column;
        span {
            font-size: 1.2rem;
            color: var(--grey-500);
        }
        input {
            margin-top: 0.5rem;
            min-height: 48px;
            padding: 0 1rem;
            font-size: 1rem;
        }
    }

    .sub-description {
        font-size: 0.8rem;
        color: var(--grey-400); 
    }
`;

export default InputForm;