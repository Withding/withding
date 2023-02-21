import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import React, { useCallback, useEffect } from "react";

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
 * EmailAuth에 사용되는 인증코드 입력창 컴포넌트
 * @param props.value 인증코드
 * @param props.onChangeValue 인증코드 변경 이벤트
 * @param props.error 인증코드 에러
 * @param props.timer 인증코드 타이머
 * @param props.setTimer 인증코드 타이머 변경 이벤트
 * @param props.onCheckAuthCode 인증코드 확인 이벤트
 * @param props.isSuccessSendMail 이메일 인증 성공 여부
 * @param props.requestCodeIsLoading 인증코드 요청 로딩 여부
 * @param props.invalidAuthCode 인증코드 유효하지 않음
 * 
 * @returns 
 */
function AuthCodeInput({
    value,
    onChangeValue,
    error,
    timer,
    setTimer,
    onCheckAuthCode,
    isSuccessSendMail,
    requestCodeIsLoading,
    invalidAuthCode
}: {
    value: string;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean | undefined
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
    onCheckAuthCode: () => void;
    isSuccessSendMail: boolean;
    requestCodeIsLoading: boolean;
    invalidAuthCode: boolean;
}) {
    return (
        <React.Fragment>
            <div className="field">
                <div className="auth-wrap">
                    <Input
                        className="input"
                        type="text"
                        name="authCode"
                        placeholder="인증번호 입력"
                        value={value}
                        onChange={onChangeValue}
                        error={error || timer === 0}
                        maxLength={6}
                    />
                    <Timer
                        timer={timer}
                        setTimer={setTimer}
                    />
                </div>
                <Button
                    className={`check-auth-button ${isSuccessSendMail ? "fill-btn" : ""}`}
                    onClick={onCheckAuthCode}
                    disabled={requestCodeIsLoading || timer === 0}
                    value={"확인"}
                />
            </div>
            {timer !== 0 && invalidAuthCode && <p className="error">{"인증번호가 일치하지 않습니다."}</p>}
            {timer === 0 && <p className="error">{"인증시간이 만료되었습니다. 재인증 해주세요"}</p>}
            {(error && timer !== 0) && <p className="error">{error}</p>}
            <p className="auth-help-text">
                {"인증번호 입력해주세요"}
            </p>
        </React.Fragment>
    );
}

export default AuthCodeInput;