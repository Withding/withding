import React from "react";
import NoneBorderButton from "../common/NoneBorderButton";

function Login() {
    return (
        <React.Fragment>
            <NoneBorderButton
                value={"로그인"}
                style={{ marginRight: "1rem" }}
            />
            <NoneBorderButton
                value={"회원가입"}
            />
        </React.Fragment>
    );
}

export default Login;