import React from "react";
import LabelValidInput from "../../../components/common/LabelValidInput";
import EmailSignupContext from "../../../store/EmailSignupContext";

/**
 * 비밀번호 입력 컴포넌트 
 * @returns 
 */
function Password() {
    const { values, onChangeValues } = React.useContext(EmailSignupContext);
    return (
        <div>
            <LabelValidInput
                className="password-input label-input"
                label={"비밀번호"}
                input={{
                    type: "password",
                    name: "password",
                    placeholder: "비밀번호 입력",
                    value: values.password,
                    onChange: onChangeValues,
                }}
                valid={true}
                msg={"비밀번호를 입력해주세요"}
            />
            <LabelValidInput
                className="password-input"
                label={""}
                input={{
                    type: "password",
                    name: "password2",
                    placeholder: "비밀번호 재입력",
                    value: values.password2,
                    onChange: onChangeValues,
                }}
                valid={true}
                msg={"비밀번호를 입력해주세요"}
            />
        </div>
    );
}

export default Password;