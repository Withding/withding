import React, { useCallback } from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import EmailSignupForm from "./EmailSignupForm";
import useForm from "../../../hooks/use-form";
import SignupValidator from "./SignupValidator";
import { useMutation, useQuery } from "react-query";
import requestAuthCode from "@/utils/RequestApis/signup/requestAuthCode";
import checkAuthCode from "@/utils/RequestApis/signup/checkAuthCode";
import requestSignup from "@/utils/RequestApis/signup/requestSignup";
import { useNavigate } from "react-router-dom";

/**
 * 이메일 회원가입 컴포넌트
 * @returns 
 */
function EmailSignup() {
    // const [isSuccessSendMail, setIsSuccessSendMail] = useState<boolean>(false); // 이메일에 인증코드 전송여부
    const navigator = useNavigate();
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
    const [secretKey, setSecretKey] = React.useState<string>("");
    // 이메일에 인증코드 보내기
    const { refetch: requestCode, isSuccess: isSuccessSendMail, isLoading: requestCodeIsLoading } =
        useQuery(["requestAuthCode"], () => requestAuthCode(values.email), {
            enabled: false,
            suspense: false,
            useErrorBoundary: false,
            retry: 30
        });

    // 인증코드 확인
    const { mutate, isError: inValidAuthCode, isSuccess: validAuthCode }
        = useMutation(["checkAuthCode"], () => checkAuthCode(values.email, values.authCode), {
            useErrorBoundary: false,
            onSuccess(data: { secretKey: string }) {
                setSecretKey(() => data.secretKey);
            },
        });

    // 회원가입
    const { mutate: signup } = useMutation(["signup"], () => requestSignup({
        email: values.email,
        name: values.name,
        password: values.password,
        secretKey
    }), {
        useErrorBoundary: false,
        onSuccess: (res) => {
            if (res.status === 204) {
                navigator("/signup/success");
            }
        }
    });

    // 이메일 인증 클릭
    const sendEmailHandler = useCallback(() => {
        if (errors.email || values.email.length === 0) return;
        requestCode();
    }, [errors.email, requestCode, values.email]);

    // 인증코드 확인 클릭
    const checkAuthCodeHandler = useCallback(() => {
        if (errors.authCode || values.authCode.length === 0) return;
        mutate();
    }, [errors.authCode, mutate, values.authCode.length]);

    // 회원가입 버튼 클릭
    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget);
        signup();
    }, [signup]);

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