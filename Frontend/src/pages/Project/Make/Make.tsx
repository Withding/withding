import ProjectMakeContext from "@/store/ProjectMakeContext";
import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Intro from "./Intro/Intro";
import Ready from "./Ready/Ready";


interface EpisodeType {
    step: number;
    component: EmotionJSX.Element;
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
        { step: 1, component: <Intro /> },
        { step: 2, component: <Ready /> },
    ];
    const render = episode.find((item) => item.step === step)?.component; // step에 해당하는 컴포넌트를 렌더링  

    const goNextStepHandler = useCallback(() => {
        navigator(`/project/make?step=${step + 1}`);
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
                    {render}
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

    p {
        font-size: 1.1rem;
        color: var(--grey-500);
        font-weight: 400;
    }

    main {
        width: 100%;
        padding: 1rem 2rem;
    }

    @media screen and (max-width: 1095px) {
        aside {
            display: none;
        }
    }
`;

export default Make;