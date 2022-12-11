import { css } from "@emotion/react";
import React from "react";
import Button from "../../components/common/Button";
import LabelValidInput from "../../components/common/LabelValidInput";
import EmailSignupType from "../../types/EmailSignupType";

interface EmailSignupFormProps {
    values: EmailSignupType
    onChangeValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sendEmail: boolean;
    onSendEmail: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * 이메일 회원가입 폼 컴포넌트
 * @param props.values - 이메일, 인증번호, 이름
 * @param props.onChangeValues - 값들 변경 이벤트 이벤트
 * @param props.sendEmail - 이메일 인증 여부
 * @param props.onSendEmail - 이메일 인증 버튼 클릭시
 * @returns 
 */
function EmailSignupForm(props: EmailSignupFormProps) {
    return (
        <form
            onSubmit={props.onSubmit}
            css={style}>
            <div className="email-auth">
                <div
                    className="field"
                >
                    <LabelValidInput
                        className="email-input label-input"
                        label={"이메일"}
                        input={{
                            type: "email",
                            name: "email",
                            placeholder: "이메일 계정",
                            value: props.values.email,
                            onChange: props.onChangeValues,
                        }}
                        valid={true}
                        msg={"아이디를 입력해주세요"}
                    />
                    <Button
                        className={`email-auth-button ${props.sendEmail ? "non-btn" : "fill-btn"}`}
                        onClick={props.onSendEmail}
                        value={"인증하기"}
                    />
                </div>
                {props.sendEmail &&
                    <React.Fragment>
                        <div className="field">
                            <LabelValidInput
                                valid={true}
                                label={""}
                                className="auth-input"
                                input={{
                                    type: "text",
                                    name: "authCode",
                                    placeholder: "인증번호 입력",
                                    value: props.values.authCode,
                                    onChange: props.onChangeValues,
                                }}
                                msg={"인증번호를 입력해주세요"}
                            />
                            <Button
                                className={`check-auth-button ${props.sendEmail ? "fill-btn" : ""}`}
                                value={"확인"}
                            />
                        </div>
                        <p className="auth-help-text">
                            {"인증번호 입력해주세요"}
                        </p>
                    </React.Fragment>
                }
            </div>
            <LabelValidInput
                className="name-input label-input"
                label={"이름"}
                input={{
                    type: "text",
                    name: "name",
                    placeholder: "이름 입력",
                    value: props.values.name,
                    onChange: props.onChangeValues,
                }}
                valid={true}
                msg={"이름을 입력해주세요"}
            />
            <div className="field">
                <LabelValidInput
                    className="password-input label-input"
                    label={"비밀번호"}
                    input={{
                        type: "password",
                        name: "password",
                        placeholder: "비밀번호 입력",
                        value: props.values.password,
                        onChange: props.onChangeValues,
                    }}
                    valid={true}
                    msg={"비밀번호를 입력해주세요"}
                />
                <LabelValidInput
                    className="password-input"
                    label={""}
                    input={{
                        type: "password",
                        name: "password2",
                        placeholder: "비밀번호 재입력",
                        value: props.values.password2,
                        onChange: props.onChangeValues,
                    }}
                    valid={true}
                    msg={"비밀번호를 입력해주세요"}
                />
            </div>
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


    & > .email-auth  {
        .field {
            display: inline-flex;
            align-items: flex-end;
        }
        .email-input, .auth-input {
            margin-right: 0.5rem;
            width: 100%;
        }
        .email-auth-button, .check-auth-button {
            height: 48px;
            min-width: 5rem;
            text-align: center;
        }

        .auth-help-text {
            margin-top: 1rem;
            font-size: 0.7rem;
            color: var(--grey-400);
            font-weight: 300;
        }
        
    }

    & > .submit {
        width: 100%;
        height: 48px;
        text-align: center;
        margin-top: 2rem;
    }
`;

export default EmailSignupForm;