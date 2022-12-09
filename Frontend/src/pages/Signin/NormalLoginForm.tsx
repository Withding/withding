import { css } from "@emotion/react";
import React, { useCallback, useEffect } from "react";
import ValidInput from "../../components/common/ValidInput";



interface NormalLoginFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement> | null) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    emailBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    values: {
        email: string;
        password: string;
    }
    errors: {
        email: boolean;
        password: boolean;
    }
}

/**
 * 일반 로그인 UI
 * @param props.onSubmit - 로그인 버튼 클릭 또는 엔터  입력시 실행되는 함수
 * @param props.onChange - input 태그의 값이 변경될 때 실행되는 함수
 * @param props.emailBlur - 이메일 입력창에서 포커스가 벗어날 때 실행되는 함수
 * @param props.values - input 태그의 값
 * @param props.errors - input 태그의 값의 유효성 검사 결과
 * @returns
 */
function NormalLoginForm(props: NormalLoginFormProps) {
    return (
        <form
            onSubmit={props.onSubmit}
            css={style}
        >
            <ValidInput
                input={{
                    type: "text",
                    placeholder: "이메일 입력",
                    name: "email",
                    onBlur: props.emailBlur,
                    onChange: props.onChange,
                    value: props.values.email,
                }}
                valid={props.errors.email}
                msg={"이메일 형식이 올바르지 않습니다."}
            />

            <ValidInput
                input={{
                    type: "password",
                    placeholder: "비밀번호 입력",
                    name: "password",
                    onChange: props.onChange,
                    value: props.values.password,
                }}
                valid={props.errors.password}
                msg={"이메일 형식이 올바르지 않습니다."}
            />
            <p className="forgot">
                <a>{"로그인 정보를 잊으셨나요?"}</a>
            </p>

            <input
                type="submit"
                value="로그인"
            />
        </form>
    );
}

const style = css`
    font-weight: 300;

    input {
        padding: 1rem 0.9rem;
        height: 48px;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 1.2;
    }

    input[name="password"] {
        margin-top: 1rem;
    }

    input[type="submit"] {
        all: unset;
        margin-top: 1.5rem;
        width: 100%;
        height: 48px;
        color: var(--white);
        background-color: var(--green-200);
        text-align: center;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: var(--green-300);
    }

    & > .forgot {
        margin-top: 1.2rem;
        text-align: right;
        font-size: 0.8rem;
        color: var(--grey-400);
        cursor: pointer;
    }
`;

export default React.memo(NormalLoginForm);