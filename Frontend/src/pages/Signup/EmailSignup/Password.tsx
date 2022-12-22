import React, { useCallback, useState } from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { css } from "@emotion/react";
import Input from "@/components/common/Input";


interface InputPasswordProps {
    value: string;
    onChangeValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    msg: string | boolean;
    error: boolean;
    placeholder: string;
    className: string;
    disabled: boolean;
}

/**
 * 비밀번호 보여주기 버튼이 있는 InputPassword 컴포넌트
 *  
 * @returns 
 */
function InputPassword(props: InputPasswordProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const visiblePasswordHandler = useCallback(() => {
        setIsPasswordVisible((prev) => !prev);
    }, []);
    return (
        <label className={props.className} css={style}>
            <p>{props.label}</p>
            <div className="password-input">
                <Input
                    type={isPasswordVisible ? "text" : "password"}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChangeValues}
                    disabled={props.disabled}
                    error={props.error}
                />
                {
                    !isPasswordVisible
                        ?
                        <MdVisibility
                            className="password-visibility-on password-icon"
                            onClick={visiblePasswordHandler}
                        />
                        :
                        <MdVisibilityOff
                            className="password-visibility-off password-icon"
                            onClick={visiblePasswordHandler}
                        />
                }
            </div>
            {props.error && <p className="error">{props.msg}</p>}
        </label>
    );
}
/**
 * 비밀번호 입력 컴포넌트 
 * @returns 
 */
function Password() {
    const { values, onChangeValues, errors, validAuthCode } = React.useContext(EmailSignupContext);
    return (
        <div>
            <InputPassword
                className={"password-input label-input"}
                value={values.password}
                onChangeValues={onChangeValues}
                label={"비밀번호"}
                name={"password"}
                msg={errors.password}
                error={errors.password}
                placeholder={"비밀번호 입력"}
                disabled={!validAuthCode}
            />
            <InputPassword
                className={"password-input password-reinput"}
                value={values.passwordConfirm}
                onChangeValues={onChangeValues}
                label={""}
                name={"passwordConfirm"}
                msg={"비밀번호가 일치하지 않습니다."}
                error={
                    values.passwordConfirm.length > 0 && values.password !== values.passwordConfirm
                }
                placeholder={"비밀번호 입력"}
                disabled={!validAuthCode}
            />
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    .error {
        line-height: 2;
        color: rgb(242, 85, 85);
        font-size: 0.9rem;
    }
    .password-input {
        position: relative;
        width: 100%;
        display: inline-flex;
        align-items: center;
        .password-icon {
            cursor: pointer;
            position: absolute;
            right: 0;
            bottom: 0;
            margin-bottom: 1rem;
            margin-right: 1rem;
            font-size: 1.2rem;
        }
    }
    
`;

export default Password;