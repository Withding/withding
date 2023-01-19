import ProjectMakeContext from "@/store/ProjectMakeContext";
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
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";

/**
 * /project/make 페이지 컴포넌트
 * 프로젝트 생성 페이지
 * @returns 
 */
function Intro() {
    const step = useStepParam();
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
            <Wrapper>
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
            </Wrapper>
        </ProjectMakeContext.Provider>
    );
}




export default Intro;