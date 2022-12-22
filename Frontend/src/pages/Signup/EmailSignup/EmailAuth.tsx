import { css } from "@emotion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import EmailSignupContext from "@/store/EmailSignupContext";
import EmailInput from "./EmailInput";
import AuthCodeInput from "./AuthCodeInput";

/**
 * Timer 컴포넌트
 * @param props 
 * @returns 
 */
function Timer(props: { timer: number, setTimer: React.Dispatch<React.SetStateAction<number>> }) {
    const { timer, setTimer } = props;
    const secondToMinute = useCallback((milliSecond: number) => {
        const minute = Math.floor(milliSecond / 60);
        const second = milliSecond % 60;
        return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) {
                return;
            }
            setTimer(timer => timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, setTimer]);

    return (
        <p className="timer">{secondToMinute(timer)}</p>
    );
}


/**
 * 이메일 인증 영역
 * @returns 
 */
function EmailAuth() {
    const { values, onChangeValues, isSuccessSendMail, onSendMail, errors, requestCodeIsLoading, onCheckAuthCode,
        invalidAuthCode, validAuthCode }
        = React.useContext(EmailSignupContext);
    const LIMIT_TIME = useMemo(() => 180, []);
    const [timer, setTimer] = useState<number>(LIMIT_TIME);

    // 이메일 인증 재전송
    const onRetryEmailAuth = useCallback(() => {
        onSendMail();
        setTimer(LIMIT_TIME);
    }, [LIMIT_TIME, onSendMail]);

    return (
        <div css={style} className="email-auth">
            <EmailInput
                value={values.email}
                onChangeValue={onChangeValues}
                error={errors.email}
                onSendMail={onSendMail}
                isSuccessSendMail={isSuccessSendMail}
                requestCodeIsLoading={requestCodeIsLoading}
                onRetryEmailAuth={onRetryEmailAuth}
                timer={timer}
                disabled={validAuthCode}
            />
            {(isSuccessSendMail && !validAuthCode) &&
                <AuthCodeInput
                    value={values.authCode}
                    onChangeValue={onChangeValues}
                    error={errors.authCode}
                    onCheckAuthCode={onCheckAuthCode}
                    timer={timer}
                    setTimer={setTimer}
                    isSuccessSendMail={isSuccessSendMail}
                    requestCodeIsLoading={requestCodeIsLoading}
                    invalidAuthCode={invalidAuthCode}
                />
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

    .retry-btn {
        background-color: var(--orange);
        color: var(--white);
    }

    .retry-btn:hover {
        background-color: var(--orange-600);
    }

    .error {
        line-height: 2;
        color: rgb(242, 85, 85);
        font-size: 0.9rem;
    }

    .auth-wrap {
        position: relative;
        width: 100%;
        display: inline-flex;
        align-items: center;
        margin-top: 0.3rem;
        margin-right: 0.5rem;
        input {
            margin: 0;
        }
        .timer {
            position: absolute;
            right: 0;
            margin-right: 0.5rem;
            font-size: 0.8rem;
            color: var(--coral);
        }
    }
    
`;

export default EmailAuth;

function useClientQuery() {
    throw new Error("Function not implemented.");
}
