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

    const [errors, setErrors] = React.useState<NormalLoginValuesValid>({
        email: true,
        password: true,
    });

    const isValidEmail = useCallback((email: string) => {
        const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return emailRegex.test(email);
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
        setErrors({
            ...errors,
            [name]: isValidEmail(value),
        });
    }, [errors, isValidEmail]);

    const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement> | null) => {
        event?.preventDefault();
        console.log(values);

    }, [values]);

    return (
        <React.Fragment>
            <NormalLoginForm
                onSubmit={onSubmitHandler}
                onChange={valueChangeHandler}
                emailBlur={emailBlurHandler}
                values={values}
                errors={errors}
            />
        </React.Fragment>
    );
}

export default NormalLogin;