import React, { useCallback, useState } from "react";
import EmailSignupContext from "../../../store/EmailSignupContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { css } from "@emotion/react";
import ValidInput from "../../../components/common/ValidInput";


interface InputPasswordProps {
    value: string;
    onChangeValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    msg: string | boolean;
    valid: boolean;
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
        <div css={style}>
            <label className={props.className}>
                {props.label}
                <ValidInput
                    input={{
                        type: isPasswordVisible ? "text" : "password",
                        name: props.name,
                        placeholder: props.placeholder,
                        value: props.value,
                        onChange: props.onChangeValues,
                        disabled: props.disabled,
                    }}
                    valid={props.valid}
                    msg={props.msg}
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
            </label>

        </div>
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
                valid={!errors.password}
                placeholder={"비밀번호 입력"}
                disabled={!validAuthCode}
            />
            <InputPassword
                className={"password-input password-reinput"}
                value={values.password2}
                onChangeValues={onChangeValues}
                label={""}
                name={"password2"}
                msg={"비밀번호를 입력해주세요"}
                valid={!errors.password2}
                placeholder={"비밀번호 입력"}
                disabled={!validAuthCode}
            />
        </div>
    );
}

const style = css`
    position:relative;
    .password-icon {
        cursor: pointer;
        position: absolute;
        right: 0;
        bottom: 0;
        margin-bottom: 1rem;
        margin-right: 1rem;
        font-size: 1.2rem;
    }
`;

export default Password;