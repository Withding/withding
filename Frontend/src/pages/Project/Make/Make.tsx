import ProjectMakeContext from "@/store/ProjectMakeContext";
import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Intro from "./Intro/Intro";
import Ready from "./Ready/Ready";
import Button from "@/components/common/Button";


interface EpisodeType {
    step: number;
    component: EmotionJSX.Element;
    nextButtonValue: string;
}

/**
 * /project/make 페이지 컴포넌트
 * 프로젝트 생성 페이지
 * @returns 
 */
function Make() {
    const { search } = useLocation();
    const step = parseInt(new URLSearchParams(search).get("step") ?? "1");
    const navigator = useNavigate();
    const episode: EpisodeType[] = [
        { step: 1, component: <Intro />, nextButtonValue: "좋아요" },
        { step: 2, component: <Ready />, nextButtonValue: "다음" },
        { step: 3, component: <Ready />, nextButtonValue: "다음" },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  

    const goNextStepHandler = useCallback(() => {
        if (episode.length > step)
            navigator(`/project/make?step=${step + 1}`);
    }, [episode.length, navigator, step]);

    const prevStepHandler = useCallback(() => {
        if (step !== 1)
            navigator(`/project/make?step=${step - 1}`);
    }, [navigator, step]);
    return (
        <ProjectMakeContext.Provider value={{
            goNextStepHandler
        }}>
            <div css={style}>
                <aside>
                    menu
                </aside>
                <main>
                    {render?.component}
                    <article className="button">
                        {render?.step !== 1 &&
                            <Button
                                className="prev"
                                onClick={prevStepHandler}
                                value="< 이전"
                            />
                        }
                        {episode.length > render!.step &&
                            <Button
                                className="next"
                                onClick={goNextStepHandler}
                                value={render?.nextButtonValue ?? ""}
                            />
                        }
                    </article>
                </main>
            </div>
        </ProjectMakeContext.Provider>
    );
}


const style = css`
    width: 100%;
    height: 100%;
    display: inline-flex;
    line-height: 1.3;

    h1{
        font-weight: 800;
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    p[className="description"] {
        font-size: 1.1rem;
        color: var(--grey-500);
        font-weight: 400;
    }

    main {
        width: 100%;
        padding: 1rem 2rem;
    }

    .button {
        margin-top: 2rem;
        width: 100%;
    }

    button {
        min-height: 48px;
        text-align: center;
        margin-right: 2rem;
    }

    .next {
        color: var(--white);
        background-color: var(--green-300);
        min-width: 15rem;
    }

    .next:hover {
        background-color: var(--green-400);
    }

    .prev {
        color: var(--grey-500);
    }

    @media screen and (max-width: 1095px) {
        aside {
            display: none;
        }

        .next {
            width: 20%;
        }
        .prev {
            width: 20%;
        }
    }
`;

export default Make;