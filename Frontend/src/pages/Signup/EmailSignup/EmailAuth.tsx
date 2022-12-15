import { css } from "@emotion/react";
import React from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import EmailSignupContext from "../../../store/EmailSignupContext";

function EmailAuth() {
    const { values, onChangeValues, isSuccessSendMail, onSendMail, errors }
        = React.useContext(EmailSignupContext);
    return (
        <div css={style} className="email-auth">
            <div
                className="field"
            >
                <label className="input label-input">
                    이메일
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일 계정"
                        value={values.email}
                        onChange={onChangeValues}
                        error={errors.email}
                    />
                </label>
                <Button
                    className={`email-auth-button ${isSuccessSendMail ? "non-btn" : "fill-btn"}`}
                    onClick={onSendMail}
                    value={"인증하기"}
                />
            </div>
            {errors.email && <p className="error">{"에러"}</p>}
            {isSuccessSendMail &&
                <React.Fragment>
                    <div className="field">
                        <Input
                            className="input"
                            type="text"
                            name="authCode"
                            placeholder="인증번호 입력"
                            value={values.authCode}
                            onChange={onChangeValues}
                            error={errors.authCode}
                        />
                        <Button
                            className={`check-auth-button ${isSuccessSendMail ? "fill-btn" : ""}`}
                            value={"확인"}
                        />
                    </div>
                    {errors.authCode && <p className="error">{"인증번호를 입력해주세요"}</p>}
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
        display: flex;
        flex-direction: row;
        align-items: end;
        width: 100%;
    }
    .input {
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

    .error {
        line-height: 2;
        color: rgb(242, 85, 85);
        font-size: 0.9rem;
    }
`;

export default EmailAuth;