import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import React from "react";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import EpisodeType from "@/types/EpisodeType";
import HorizontalProgressBar from "@/components/common/HorizontalProgressBar";

/**
 * /project/make 페이지 컴포넌트
 * @returns 
 */
function Make() {
    const step = useStepParam();
    const episode: EpisodeType[] = [
        { step: 1, component: <ProjectInfo />, nextButtonValue: "검토하기", name: "프로젝트 정보 입력" },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  
    return (
        <Wrapper>
            <ProcedureNavigator
                list={episode}
                path={"/project/make?step="}
                currnet={1}
            />
            <main>
                <HorizontalProgressBar
                    now={step}
                    max={episode.length} height={3}
                />
                <span className="left-page">{`${episode.length - step}단계 남음`}</span>
                {render?.component}

            </main>

        </Wrapper>
    );
}

export default Make;