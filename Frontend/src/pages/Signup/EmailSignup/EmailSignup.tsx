import React, { useCallback } from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import EmailSignupForm from "./EmailSignupForm";
import useForm from "../../../hooks/use-form";
import SignupValidator from "./SignupValidator";
import { useMutation, useQuery } from "react-query";
import requestAuthCode from "@/utils/RequestApis/signup/requestAuthCode";
import checkAuthCode from "@/utils/RequestApis/signup/checkAuthCode";

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
            authCode: ""
        },
        validator: SignupValidator
    });

    // 이메일에 인증코드 보내기
    const { refetch: requestCode, isSuccess: isSuccessSendMail, isLoading: requestCodeIsLoading } =
        useQuery(["requestAuthCode"], () => requestAuthCode(values.email), {
            enabled: false,
            suspense: false,
            useErrorBoundary: false,
            retry: 30
        });

    const { mutate, isError: inValidAuthCode, isSuccess: validAuthCode }
        = useMutation(["checkAuthCode"], () => checkAuthCode(values.email, values.authCode), {
            useErrorBoundary: false,
            onSuccess(data) {
                console.log(data);
            },
        });

    // 이메일 인증 클릭
    const sendEmailHandler = useCallback(() => {
        if (errors.email || values.email.length === 0) return;
        requestCode();
    }, [errors.email, requestCode, values.email]);

    const checkAuthCodeHandler = useCallback(() => {
        if (errors.authCode || values.authCode.length === 0) return;
        mutate();
    }, [errors.authCode, mutate, values.authCode.length]);

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
            requestCodeIsLoading: requestCodeIsLoading,
            onCheckAuthCode: checkAuthCodeHandler,
            invalidAuthCode: inValidAuthCode,
            validAuthCode: validAuthCode
        }}>
            <EmailSignupForm />
        </EmailSignupContext.Provider>

    );
}

export default EmailSignup;