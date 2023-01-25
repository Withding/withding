import React, { useCallback } from "react";
import Start from "./Start/Start";
import Ready from "./Ready/Ready";
import After from "./After/After";
import Final from "./Final/Final";
import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import EpisodeType from "@/types/EpisodeType";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";
import ButtonController from "../ButtonController";
import MainHeader from "../MainHeader";
import { useMutation } from "react-query";
import createProject from "@/utils/RequestApis/projectmake/createProject";
import { useNavigate } from "react-router-dom";

/**
 * /project/intro 페이지 컴포넌트
 * 프로젝트 생성 페이지
 * @returns 
 */
function Intro() {
    const navigate = useNavigate();
    const step = useStepParam();

    const { mutate } = useMutation(createProject, {
        onSuccess: (data) => {
            navigate(`/project/make?step=1&project=${data.id}`);
        }
    });

    const onCreateProject = useCallback(() => {
        mutate();
    }, [mutate]);

    const episode: EpisodeType[] = [
        { step: 1, component: <Start />, nextButtonValue: "좋아요", name: "시작하기" },
        { step: 2, component: <Ready />, nextButtonValue: "다음", name: "프로젝트 생성 진행단계" },
        { step: 3, component: <After />, nextButtonValue: "다음", name: "프로젝트 공개후 진행단계" },
        { step: 4, component: <Final />, nextButtonValue: "시작하기", name: "프로젝트 시작하기", clickEvent: onCreateProject },
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
                <MainHeader
                    progressBar={{
                        now: step,
                        max: episode.length,
                        height: 3
                    }}
                    leftPage={`${episode.length - step}`}
                />
                {render?.component}
                <ButtonController
                    className="button"
                    step={step}
                    lastStep={episode.length}
                    path={"/project/intro?step="}
                    nextButtonValue={render?.nextButtonValue}
                    onClick={render?.clickEvent}
                />
            </main>
        </Wrapper>
    );
}




export default Intro;