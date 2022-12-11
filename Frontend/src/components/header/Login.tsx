import React from "react";
import NoneBorderButton from "../common/NoneBorderButton";
import BaseProps from "../../types/BaseProps";
import { useNavigate } from "react-router-dom";

function Login(props: BaseProps) {
    const navigator = useNavigate();

    return (
        <div
            className={props.className}
        >
            <NoneBorderButton
                value={"로그인"}
                style={{ marginRight: "1rem" }}
                onClick={() => navigator("/signin")}
            />
            <NoneBorderButton
                value={"회원가입"}
                onClick={() => navigator("/signup")}
            />
        </div>
    );
}

export default Login;