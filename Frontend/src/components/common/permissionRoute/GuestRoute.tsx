import React from "react";
import { css } from "@emotion/react";
import useIsLogin from "@/hooks/useIsLogin";

interface GuestRouteProps {
    RouteComponent: any;
}

const View = () => {
    return (
        <div css={css`
            display: flex; 
            justify-content:center; 
            align-items:center;
            min-height: 30vh;
            h1{ 
                font-size: 1.2rem;
                font-weight: 800;
            }
        `}>
            <h1>로그인한 상태로는 이용할수 없는 페이지 입니다.</h1>
        </div>
    );
};

/**
 * 인증되지 않은 사용자만 접근 가능한 라우트
 * @param props.RouteComponent 접근하려는 경로에 해당하는 컴포넌트
 * @returns 
 */
function GuestRoute(props: GuestRouteProps) {
    const { RouteComponent } = props;
    const isLogin = useIsLogin();
    return (
        <React.Fragment>
            {!isLogin ? <RouteComponent /> : <View />}
        </React.Fragment>
    );
}

export default GuestRoute;