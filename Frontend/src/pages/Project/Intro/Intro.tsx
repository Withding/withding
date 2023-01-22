import React from "react";
import Start from "./Start/Start";
import Ready from "./Ready/Ready";
import After from "./After/After";
import Final from "./Final/Final";
import HorizontalProgressBar from "@/components/common/HorizontalProgressBar";
import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import EpisodeType from "@/types/EpisodeType";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";
import ButtonController from "../ButtonController";

/**
 * /project/make 페이지 컴포넌트
 * 프로젝트 생성 페이지
 * @returns 
 */
function Intro() {
    const step = useStepParam();
    const episode: EpisodeType[] = [
        { step: 1, component: <Start />, nextButtonValue: "좋아요", name: "시작하기" },
        { step: 2, component: <Ready />, nextButtonValue: "다음", name: "프로젝트 생성 진행단계" },
        { step: 3, component: <After />, nextButtonValue: "다음", name: "프로젝트 공개후 진행단계" },
        { step: 4, component: <Final />, nextButtonValue: "시작하기", name: "정산" },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  

    return (
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
                <ButtonController
                    step={step}
                    lastStep={episode.length}
                    path={"/project/intro?step="}
                    nextButtonValue={render?.nextButtonValue}
                />
            </main>
        </Wrapper>
    );
}




export default Intro;