import { css } from "@emotion/react";
import React from "react";
import Button from "../../../components/common/Button";
import LabelValidInput from "../../../components/common/LabelValidInput";
import EmailSignupContext from "../../../store/EmailSignupContext";
import EmailAuth from "./EmailAuth";
import Password from "./Password";

/**
 * 이메일 회원가입 폼 컴포넌트
 * @returns 
 */
function EmailSignupForm() {
    const { values, onChangeValues, onSubmit }
        = React.useContext(EmailSignupContext);
    return (
        <form
            onSubmit={onSubmit}
            css={style}>
            <EmailAuth />
            <LabelValidInput
                className="name-input label-input"
                label={"이름"}
                input={{
                    type: "text",
                    name: "name",
                    placeholder: "이름 입력",
                    value: values.name,
                    onChange: onChangeValues,
                }}
                valid={true}
                msg={"이름을 입력해주세요"}
            />
            <Password />
            <Button
                className="fill-btn submit"
                value={"완료"}
            />
        </form>
    );
}

const style = css`
    .label-input {
        display: inline-block;
        margin-top: 2rem;
        width: 100%;
    }

    input {
        height: 48px;
        padding: 1rem;
        font-size: 1.1rem;
        line-height: 1.2;
        font-weight: 300;
        margin-top: 0.3rem;
    }

    .non-btn {
        outline: 1px solid var(--grey-200);
    }

    .non-btn:hover {
        background-color: var(--grey-100);
    }

    .fill-btn {
        border: none;
        background-color: var(--green-200);
        color: var(--white);
    }

    .fill-btn:hover {
        background-color: var(--green-300);
    }
    


    & > .submit {
        width: 100%;
        height: 48px;
        text-align: center;
        margin-top: 2rem;
    }
`;

export default EmailSignupForm;