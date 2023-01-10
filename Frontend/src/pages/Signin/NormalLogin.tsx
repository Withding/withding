import fetchUserInfo from "@/utils/RequestApis/signin/login";
import React, { useCallback, useContext, useState } from "react";
import NormalLoginForm from "./NormalLoginForm";
import NormalLoginValues from "./NormalLoginValues";
import NormalLoginValuesValid from "./NormalLoginValuesValid";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import UserContext from "@/store/UserContext";
import { useNavigate } from "react-router-dom";

/**
 * 일반 로그인 컴포넌트
 * @returns 
 */
function NormalLogin() {
    const [loginFailMessage, setLoginFailMessag] = useState<string>(""); // 로그인 실패시 메세지
    const { onChangeUserInfo } = useContext(UserContext);
    const navigator = useNavigate();
    const [values, setValues] = useState<NormalLoginValues>({
        email: "",
        password: "",
    });

    const [valid, setValid] = useState<NormalLoginValuesValid>({
        email: true,
        password: true,
    });

    const { mutate } = useMutation(["login"], () => fetchUserInfo({
        email: values.email,
        password: values.password,
    }), {
        useErrorBoundary: false,
        onSuccess: (res) => {
            onChangeUserInfo({
                nickName: res.nickName,
                image: res.image,
                isLogin: true,
                accessToken: res.accessToken,
                loginType: 0
            });
            navigator("/main");
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                setLoginFailMessag("등록되지 않은 계정이거나, 이메일 또는 비밀번호가 회원정보와 일치하지 않습니다.");
            }
        }
    });

    const isValidEmail = useCallback((email: string) => {
        const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return emailRegex.test(email);
    }, []);

    const isValidPassword = useCallback((password: string) => {
        return password.length !== 0;
    }, []);

    const valueChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }, [values]);

    const emailBlurHandler = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValid({
            ...valid,
            [name]: isValidEmail(value),
        });
    }, [isValidEmail, valid]);

    const passwordBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValid({
            ...valid,
            [name]: isValidPassword(value),
        });
    }, [isValidPassword, valid]);

    const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement> | null) => {
        event?.preventDefault();
        if (values.email.length === 0) {
            setValid({
                ...valid,
                email: false,
            });
            return;
        } else if (values.password.length === 0) {
            setValid({
                ...valid,
                password: false,
            });
            return;
        }
        if (!valid.email || !valid.password) return;
        mutate();
    }, [mutate, valid, values]);

    return (
        <React.Fragment >
            <NormalLoginForm
                onSubmit={onSubmitHandler}
                onChange={valueChangeHandler}
                emailBlur={emailBlurHandler}
                passwordBlur={passwordBlur}
                values={values}
                valid={valid}
                loginFailMessage={loginFailMessage}
            />
        </React.Fragment >
    );
}

export default NormalLogin;