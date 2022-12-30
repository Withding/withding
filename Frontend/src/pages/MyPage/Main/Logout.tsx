import Button from "@/components/common/Button";
import { css } from "@emotion/react";
import React from "react";
import BaseProps from "@/types/BaseProps";

function Logout(props: BaseProps) {
    return (
        <section css={style} className={props?.className}>
            <p>카카오 로그인중</p>
            <Button
                value="로그아웃"
            />
        </section>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 0.9rem;
        font-weight: 200;
    }
    button {
        text-align: center;
        border: 1px solid var(--grey-300);
        padding: 0.8rem 1rem;
        width: 10rem;
        border-radius: 999px;
    }

    @media screen and (min-width: 1096px) {
        margin-top: 3rem;
        padding-top: 2rem;
        max-width: 180px;
        border-top: 1px solid var(--grey-200);
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        button {
            width: calc(100% - 16px);
            border-radius: 8px;
        }
    }
`;

export default Logout;