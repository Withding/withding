import React, { useCallback, useState } from "react";
import LabelValidInput from "../../../components/common/LabelValidInput";
import EmailSignupContext from "../../../store/EmailSignupContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { css } from "@emotion/react";


interface InputPasswordProps {
    value: string;
    onChangeValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    msg: string;
    valid: boolean;
    placeholder: string;
    className: string;
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
            <LabelValidInput
                className={props.className}
                label={props.label}
                input={{
                    type: isPasswordVisible ? "text" : "password",
                    name: props.name,
                    placeholder: props.placeholder,
                    value: props.value,
                    onChange: props.onChangeValues,
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
        </div>
    );
}
/**
 * 비밀번호 입력 컴포넌트 
 * @returns 
 */
function Password() {
    const { values, onChangeValues } = React.useContext(EmailSignupContext);
    return (
        <div>
            <InputPassword
                className={"password-input label-input"}
                value={values.password}
                onChangeValues={onChangeValues}
                label={"비밀번호"}
                name={"password"}
                msg={"비밀번호를 입력해주세요"}
                valid={true}
                placeholder={"비밀번호 입력"}
            />
            <InputPassword
                className={"password-input password-reinput"}
                value={values.password2}
                onChangeValues={onChangeValues}
                label={""}
                name={"password2"}
                msg={"비밀번호를 입력해주세요"}
                valid={true}
                placeholder={"비밀번호 입력"}
            />
        </div>
    );
}

const style = css`
    position:relative;

    & > .password-icon {
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