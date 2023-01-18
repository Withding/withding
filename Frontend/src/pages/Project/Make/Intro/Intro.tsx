import React, { useContext } from "react";
import UserContext from "@/store/UserContext";
import { css } from "@emotion/react";
import UserContextProps from "@/types/UserContextProps";
/**
 * 프로젝트 생성 step=1 인트로 페이지
 * @returns 
 */
function Intro() {
    const { nickName } = useContext<UserContextProps>(UserContext);
    return (
        <article
            css={style}
        >
            <h1>{`${nickName}님, 반갑습니다!`}</h1>
            <p className="description">프로젝트 개설을 축하드려요.</p>
            <p className="description">
                {`서포터님들께 제품과 서비스를 드리며 잊지 못할 경험을 선물해 보세요. ${nickName}님이 펀딩에 성공할 수 있도록 와디즈가 함께할게요.`}
            </p>
            <br />
            <br />
            <p className="description">그럼 출발해 볼까요?</p>

        </article>
    );
}

const style = css`
    @media screen and (max-width: 1095px) {
        aside {
            display: none;
        }
    }
`;

export default Intro;