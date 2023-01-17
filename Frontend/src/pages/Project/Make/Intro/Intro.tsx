import React, { useContext } from "react";
import UserContext from "@/store/UserContext";
import { css } from "@emotion/react";
import Button from "@/components/common/Button";
import UserContextProps from "@/types/UserContextProps";
import ProjectMakeContextProps from "@/types/ProjectMakeContextProps";
import ProjectMakeContext from "@/store/ProjectMakeContext";

/**
 * 프로젝트 생성 step=1 인트로 페이지
 * @returns 
 */
function Intro() {
    const { nickName } = useContext<UserContextProps>(UserContext);
    const { goNextStepHandler } = useContext<ProjectMakeContextProps>(ProjectMakeContext);
    return (
        <article
            css={style}
        >
            <h1>{`${nickName}님, 반갑습니다!`}</h1>
            <p>프로젝트 개설을 축하드려요.</p>
            <p>
                {`서포터님들께 제품과 서비스를 드리며 잊지 못할 경험을 선물해 보세요. ${nickName}님이 펀딩에 성공할 수 있도록 와디즈가 함께할게요.`}
            </p>
            <br />
            <br />
            <p>그럼 출발해 볼까요?</p>
            <Button
                onClick={goNextStepHandler}
                value="좋아요!"
            />
        </article>
    );
}

const style = css`
    button {
        margin-top: 5rem;
        color: var(--white);
        background-color: var(--green-300);
        min-width: 24rem;
        min-height: 48px;
        text-align: center;
    }

    button:hover {
        background-color: var(--green-400);
    }

    @media screen and (max-width: 1095px) {
        button {
            width: 100%;
        }

        aside {
            display: none;
        }
    }
`;

export default Intro;