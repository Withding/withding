import Button from "@/components/common/Button";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import BaseProps from "@/types/BaseProps";
import UserContext from "@/store/UserContext";
import { RiKakaoTalkFill } from "react-icons/ri";

/**
 * 마이페이지 로그아웃 버튼
 * @param props 
 * @returns 
 */
function Logout(props: BaseProps) {
    const { loginType } = useContext(UserContext);
    const type: any[] = [
        { text: "이메일", icon: null },
        { text: "카카오", icon: <RiKakaoTalkFill /> }
    ];
    return (
        <section css={style} className={props?.className}>
            <div className="type-box">
                <span>{type[loginType].icon}</span>
                <span>{`${type[loginType].text}로 로그인중`}</span>
            </div>
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
    .type-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    svg {
        font-size: 1.2rem;
        margin-right: 0.2rem;
    }
    span {
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
        margin-bottom: 1rem;
    }
`;

export default Logout;