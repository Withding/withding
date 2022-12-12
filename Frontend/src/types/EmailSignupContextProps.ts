import React from "react";
import EmailSignupType from "./EmailSignupType";

/**
 *  EmailSignupContextProps
 *  @property {EmailSignupType} values - 회원가입 입력값들
 *  @property {React.ChangeEvent<HTMLInputElement>} onChangeValues - 회원가입 입력값 변경 이벤트
 *  @property {boolean} isSuccessSendMail - 이메일 인증 메일 발송 성공 여부
 *  @property {() => void} onSendMail - 이메일 인증 요청 이벤트
 *  @property {React.FormEvent<HTMLFormElement>} onSubmit - 회원가입 요청 이벤트
 */
interface EmailSignupContextProps {
    values: EmailSignupType
    onChangeValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isSuccessSendMail: boolean;
    onSendMail: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default EmailSignupContextProps;