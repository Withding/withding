import ProjectMakeContext from "@/store/ProjectMakeContext";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Start from "./Start/Start";
import Ready from "./Ready/Ready";
import Button from "@/components/common/Button";
import After from "./After/After";
import Final from "./Final/Final";
import HorizontalProgressBar from "@/components/common/HorizontalProgressBar";
import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import EpisodeType from "@/types/EpisodeType";
/**
 * /project/make 페이지 컴포넌트
 * 프로젝트 생성 페이지
 * @returns 
 */
function Intro() {
    const { search } = useLocation();
    const step = parseInt(new URLSearchParams(search).get("step") ?? "1");
    const navigator = useNavigate();
    const episode: EpisodeType[] = [
        { step: 1, component: <Start />, nextButtonValue: "좋아요", name: "시작하기" },
        { step: 2, component: <Ready />, nextButtonValue: "다음", name: "프로젝트 생성 진행단계" },
        { step: 3, component: <After />, nextButtonValue: "다음", name: "프로젝트 공개후 진행단계" },
        { step: 4, component: <Final />, nextButtonValue: "시작하기", name: "정산" },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  

    const goNextStepHandler = useCallback(() => {
        if (step === episode.length) {
            console.log("시작하기");
        }
        if (episode.length > step)
            navigator(`/project/intro?step=${step + 1}`);
    }, [episode.length, navigator, step]);

    const prevStepHandler = useCallback(() => {
        if (step !== 1)
            navigator(`/project/intro?step=${step - 1}`);
    }, [navigator, step]);

    return (
        <ProjectMakeContext.Provider value={{
            goNextStepHandler
        }}>
            <div css={style}>
                <ProcedureNavigator
                    list={episode}
                    path={"/project/intro?step="}
                    currnet={step}
                />
                <main>
                    <HorizontalProgressBar
                        now={render!.step}
                        max={episode.length}
                        height={3}
                    />
                    <span className="left-page">{`${(episode.length) - render!.step}단계 남음`}</span>
                    {render?.component}
                    <article className="button">
                        {render?.step !== 1 &&
                            <Button
                                className="prev"
                                onClick={prevStepHandler}
                                value="< 이전"
                            />
                        }
                        <Button
                            className="next"
                            onClick={goNextStepHandler}
                            value={render?.nextButtonValue ?? ""}
                        />
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

    .left-page {
        text-align: right;
        float: right;
        font-size: 0.8rem;
        width: 100%;
        color: var(--grey-400);
        margin-bottom: 1rem;
    }

    @media screen and (min-width: 1096px) {
        aside {
            min-width: 15rem;
            max-width: 16rem;
        }
        main {
            border-left: 1px solid var(--grey-200);
        }
    }

    @media screen and (max-width: 1095px) {
        /* aside {
            display: none;
        } */

        .next {
            width: 20%;
        }
        .prev {
            width: 20%;
        }
    }
`;

export default Intro;