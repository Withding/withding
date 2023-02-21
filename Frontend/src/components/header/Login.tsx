import React, { useContext } from "react";
import NoneBorderButton from "../common/NoneBorderButton";
import BaseProps from "../../types/BaseProps";
import { useNavigate } from "react-router-dom";
import UserContext from "@/store/UserContext";
import UserProfile from "./UserProfile";


/**
 * 헤더 로그인 컴포넌트
 * 로그인시 유저 프로필 이미지와 닉네임을 보여준다.
 * 비 로그인시 로그인, 회원가입 버튼을 보여준다.
 * @param props 
 * @returns 
 */
function Login(props: BaseProps) {
    const navigator = useNavigate();
    const { isLogin } = useContext(UserContext);
    return (
        <div
            className={props.className}
        >
            {isLogin ?
                <UserProfile />
                :
                <React.Fragment>
                    <NoneBorderButton
                        value={"로그인"}
                        style={{ marginRight: "1rem" }}
                        onClick={() => navigator("/signin")}
                    />
                    <NoneBorderButton
                        value={"회원가입"}
                        onClick={() => navigator("/signup")}
                    />
                </React.Fragment>
            }
        </div>
    );
}

export default Login;