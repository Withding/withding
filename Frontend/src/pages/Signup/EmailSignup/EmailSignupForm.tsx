import { css } from "@emotion/react";
import React from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import EmailAuth from "./EmailAuth";
import Password from "./Password";
import ValidInput from "../../../components/common/ValidInput";
import Input from "@/components/common/Input";

/**
 * 이메일 회원가입 폼 컴포넌트
 * @returns 
 */
function EmailSignupForm() {
    const { values, onChangeValues, onSubmit, errors }
        = React.useContext(EmailSignupContext);
    return (
        <form
            onSubmit={onSubmit}
            css={style}>
            <EmailAuth />
            <label className="label-input">
                이름
                <ValidInput
                    className=""
                    input={{
                        type: "text",
                        name: "name",
                        placeholder: "이름 입력",
                        value: values.name,
                        onChange: onChangeValues,
                    }}
                    valid={!errors.name}
                    msg={errors.name}
                />
            </label>
            <Password />
            <Input
                type="submit"
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