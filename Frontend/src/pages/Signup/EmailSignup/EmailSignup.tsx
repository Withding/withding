import React, { useCallback, useState } from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import EmailSignupForm from "./EmailSignupForm";
import useForm from "../../../hooks/use-form";
import SignupValidator from "./SignupValidator";

/**
 * 이메일 회원가입 컴포넌트
 * @returns 
 */
function EmailSignup() {
    const [isSuccessSendMail, setIsSuccessSendMail] = useState<boolean>(false); // 이메일에 인증코드 전송여부
    const { values, onChangeValues, errors } = useForm({
        initValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        },
        validator: SignupValidator
    });


    const sendEmailHandler = useCallback(() => {
        console.log(values.email);
        setIsSuccessSendMail(true);
    }, [values.email]);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
        console.log(errors);
    }, [errors]);

    return (
        <EmailSignupContext.Provider value={{
            values,
            onChangeValues,
            isSuccessSendMail: isSuccessSendMail,
            onSendMail: sendEmailHandler,
            onSubmit: onSubmit,
            errors: errors
        }}>
            <EmailSignupForm />
        </EmailSignupContext.Provider>

    );
}

export default EmailSignup;