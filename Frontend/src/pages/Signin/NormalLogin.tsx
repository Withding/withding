import React, { useCallback } from "react";
import NormalLoginForm from "./NormalLoginForm";
import NormalLoginValues from "./NormalLoginValues";
import NormalLoginValuesValid from "./NormalLoginValuesValid";



/**
 * 일반 로그인 컴포넌트
 * @returns 
 */
function NormalLogin() {
    const [values, setValues] = React.useState<NormalLoginValues>({
        email: "",
        password: "",
    });

    const [valid, setValid] = React.useState<NormalLoginValuesValid>({
        email: true,
        password: true,
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
        console.log(values);
    }, [valid, values]);

    return (
        <React.Fragment>
            <NormalLoginForm
                onSubmit={onSubmitHandler}
                onChange={valueChangeHandler}
                emailBlur={emailBlurHandler}
                passwordBlur={passwordBlur}
                values={values}
                valid={valid}
            />
        </React.Fragment>
    );
}

export default NormalLogin;