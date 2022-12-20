import React from "react";

/**
 *  EmailSignupContextProps
 *  @property {{[key: string]: string}} values - 회원가입 입력값들
 *  @property {React.ChangeEvent<HTMLInputElement>} onChangeValues - 회원가입 입력값 변경 이벤트
 *  @property {boolean} isSuccessSendMail - 이메일 인증 메일 발송 성공 여부
 *  @property {() => void} onSendMail - 이메일 인증 요청 이벤트
 *  @property {React.FormEvent<HTMLFormElement>} onSubmit - 회원가입 요청 이벤트
 *  @property {{[key: string]: boolean}} errors - 회원가입 입력값 에러 여부
 *  @property {boolean} requestCodeIsLoading - 이메일 인증 요청 로딩 여부
 */
interface EmailSignupContextProps {
    values: {
        [key: string]: string
    };
    onChangeValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isSuccessSendMail: boolean;
    onSendMail: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errors: {
        [key: string]: boolean;
    }
    ,
    requestCodeIsLoading: boolean;
}

export default EmailSignupContextProps;