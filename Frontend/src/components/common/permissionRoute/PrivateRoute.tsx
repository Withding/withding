import React, { useContext } from "react";
import UserContext from "@/store/UserContext";
import { Navigate } from "react-router-dom";

interface PrivateRoouteProps {
    RouteComponent: any;
    path: string;
}


/**
 * 인증된 사용자만 접근 가능한 라우트
 * 인증되지 않으면 로그인 페이지로 이동
 * @param props.path 접근하려는 경로
 * @param props.RouteComponent 접근하려는 경로에 해당하는 컴포넌트
 * @returns 
 */

function PrivateRoute(props: PrivateRoouteProps) {
    const { path, RouteComponent } = props;
    const { isLogin } = useContext(UserContext);
    return (
        <React.Fragment>
            {isLogin ? <RouteComponent /> : <Navigate to={`/signin?callback=${path}`} />}
        </React.Fragment>
    );
}

export default PrivateRoute;