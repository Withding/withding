import { css } from "@emotion/react";
import React from "react";
import Button from "../../../components/common/Button";
import LabelValidInput from "../../../components/common/LabelValidInput";
import EmailSignupContext from "../../../store/EmailSignupContext";

function EmailAuth() {
    const { values, onChangeValues, isSuccessSendMail, onSendMail }
        = React.useContext(EmailSignupContext);
    return (
        <div css={style} className="email-auth">
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
                        value: values.email,
                        onChange: onChangeValues,
                    }}
                    valid={true}
                    msg={"아이디를 입력해주세요"}
                />
                <Button
                    className={`email-auth-button ${isSuccessSendMail ? "non-btn" : "fill-btn"}`}
                    onClick={onSendMail}
                    value={"인증하기"}
                />
            </div>
            {isSuccessSendMail &&
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
                                value: values.authCode,
                                onChange: onChangeValues,
                            }}
                            msg={"인증번호를 입력해주세요"}
                        />
                        <Button
                            className={`check-auth-button ${isSuccessSendMail ? "fill-btn" : ""}`}
                            value={"확인"}
                        />
                    </div>
                    <p className="auth-help-text">
                        {"인증번호 입력해주세요"}
                    </p>
                </React.Fragment>
            }
        </div>
    );
}

const style = css`
    .field {
        display: inline-flex;
        align-items: flex-end;
        width: 100%;
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

    
`;

export default EmailAuth;