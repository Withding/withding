import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import React from "react";


/**
 * EmailAuth 이메일 입력부분
 * @param props.value: 이메일 값
 * @param props.onChangeValue: 이메일 값 변경 이벤트
 * @param props.error: 이메일 유효성 에러
 * @param props.disabled: 이메일 입력창 비활성화
 * @param props.timer: 이메일 인증 타이머 남은시간
 * @param props.onSendMail: 이메일 인증 요청 이벤트
 * @param props.onRetryEmailAuth: 이메일 인증 재요청 이벤트
 * @param props.isSuccessSendMail: 이메일 인증 성공 여부
 * @param props.requestCodeIsLoading: 이메일 인증 요청 중 여부
 */
function EmailInput({
    value,
    onChangeValue,
    error,
    disabled,
    timer,
    onSendMail,
    onRetryEmailAuth,
    isSuccessSendMail,
    requestCodeIsLoading
}: {
    value: string;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean | undefined
    disabled: boolean;
    timer: number;
    onSendMail: () => void;
    onRetryEmailAuth: () => void;
    isSuccessSendMail: boolean;
    requestCodeIsLoading: boolean;
}) {
    return (
        <React.Fragment>
            <div
                className="field"
            >
                <label className="input label-input">
                    이메일
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일 계정"
                        value={value}
                        onChange={onChangeValue}
                        error={error}
                        disabled={disabled}
                    />
                </label>
                {
                    timer !== 0 ?
                        <Button
                            className={`email-auth-button ${isSuccessSendMail ? "non-btn" : "fill-btn"}`}
                            onClick={onSendMail}
                            value={"인증하기"}
                            disabled={requestCodeIsLoading || isSuccessSendMail}
                        />
                        :
                        <Button
                            className={`email-auth-button non-btn retry-btn`}
                            onClick={onRetryEmailAuth}
                            value={"재인증"}
                        />
                }
            </div>
            {error && <p className="error">{error}</p>}
        </React.Fragment>
    );
}

export default EmailInput;