import React, { useCallback, useState } from "react";
import EmailSignupContext from "../../store/EmailSignupContext";
import EmailSignupType from "../../types/EmailSignupType";
import EmailSignupForm from "./EmailSignupForm";

/**
 * 이메일 회원가입 컴포넌트
 * @returns 
 */
function EmailSignup() {
    const [values, setValues] = useState<EmailSignupType>({
        email: "",
        authCode: "",
        name: "",
        password: "",
        password2: ""
    });

    const onChangeValues = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }, [values]);
    const [isSuccessSendMail, setIsSuccessSendMail] = useState<boolean>(false); // 이메일에 인증코드 전송여부

    const sendEmailHandler = useCallback(() => {
        console.log("sibal");
        setIsSuccessSendMail(true);
    }, []);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
    }, []);

    return (
        <EmailSignupContext.Provider value={{
            values,
            onChangeValues,
            isSuccessSendMail: isSuccessSendMail,
            onSendMail: sendEmailHandler,
            onSubmit: onSubmit,
        }}>
            <EmailSignupForm />
        </EmailSignupContext.Provider>

    );
}

export default EmailSignup;