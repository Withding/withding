import { css } from "@emotion/react";
import React, { useCallback } from "react";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";


/**
 * 이메일 회원가입 완료 페이지
 * @returns 
 */
function Success() {
    const navigator = useNavigate();

    const handleMoveToMain = useCallback(() => {
        navigator("/main");
    }, [navigator]);

    const handleMoveToLogin = useCallback(() => {
        navigator("/signin");
    }, [navigator]);
    return (
        <div css={style}>
            <h1>{"가입이 완료되었습니다."}</h1>
            <Button
                className="fill-btn"
                value="로그인 페이지로 이동"
                onClick={handleMoveToLogin}
            />
            <Button
                className="non-btn"
                value="메인 페이지로 이동"
                onClick={handleMoveToMain}
            />
        </div>
    );
}

const style = css`
    max-width: 400px;
    margin: auto 0;
    line-height: 1.5;
    & > h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 2rem;
    }

    button {
        width: 100%;
        text-align: center;
        height: 48px;
    }

    button.fill-btn {
        color: var(--white);
        background-color: var(--green-200);
        margin-bottom: 0.5rem;
    }

    button.fill-btn:hover  {
        background-color: var(--green-300);
    }

    button.non-btn {
        background-color: var(--white);
        color: var(--green-200);
        outline: 1px solid var(--green-200);
    }

    button.non-btn:hover {
        background-color: var(--grey-100);
    }
`;

export default Success;