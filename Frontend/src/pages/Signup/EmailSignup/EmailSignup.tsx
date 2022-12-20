import React, { useCallback } from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import EmailSignupForm from "./EmailSignupForm";
import useForm from "../../../hooks/use-form";
import SignupValidator from "./SignupValidator";
import { useQuery } from "react-query";
import requestAuthCode from "@/utils/RequestApis/signup/requestAuthCode";

/**
 * 이메일 회원가입 컴포넌트
 * @returns 
 */
function EmailSignup() {
    // const [isSuccessSendMail, setIsSuccessSendMail] = useState<boolean>(false); // 이메일에 인증코드 전송여부
    const { values, onChangeValues, errors } = useForm({
        initValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        },
        validator: SignupValidator
    });

    // 이메일에 인증코드 보내기
    const { refetch: requestCode, isSuccess: isSuccessSendMail, isLoading: requestCodeIsLoading } =
        useQuery(["requestAuthCode"], () => requestAuthCode(values.email), {
            enabled: false,
            suspense: false
        });

    // 이메일 인증 클릭
    const sendEmailHandler = useCallback(() => {
        if (errors.email || values.email.length === 0) return;
        requestCode();
    }, [errors.email, requestCode, values.email]);

    // 회원가입 버튼 클릭
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
            errors: errors,
            requestCodeIsLoading: requestCodeIsLoading
        }}>
            <EmailSignupForm />
        </EmailSignupContext.Provider>

    );
}

export default EmailSignup;