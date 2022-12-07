import React from "react";
import NoneBorderButton from "../common/NoneBorderButton";
import BaseProps from "../types/BaseProps";

function Login(props: BaseProps) {
    return (
        <div
            className={props.className}
        >
            <NoneBorderButton
                value={"로그인"}
                style={{ marginRight: "1rem" }}
            />
            <NoneBorderButton
                value={"회원가입"}
            />
        </div>
    );
}

export default Login;