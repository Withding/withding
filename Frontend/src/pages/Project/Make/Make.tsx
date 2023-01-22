import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import React, { useCallback, useState } from "react";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import EpisodeType from "@/types/EpisodeType";
import ButtonController from "../ButtonController";
import MainHeader from "../MainHeader";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import ProjectMakeValues from "../../../types/ProjectMakeValues";

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

    const [values, setValues] = useState<ProjectMakeValues>({
        title: "",
        category: "",
        targetAmount: 0,
        startDate: new Date().toString(),
        endDate: new Date().toString(),
    });

    const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "bestImage") {
            const { files } = e.target;
            const file = files?.[0];
            setValues({
                ...values,
                bestImage: file
            });
            return;
        }
        setValues({
            ...values,
            [name]: value
        });
    }, [values]);

    return (
        <Wrapper>
            <ProjectMakeContext.Provider value={{
                values,
                onChangeValue
            }}>
                <ProcedureNavigator
                    list={episode}
                    path={"/project/make?step="}
                    currnet={1}
                />
                <main>
                    <MainHeader
                        progressBar={{
                            now: step,
                            max: episode.length,
                            height: 3
                        }}
                        leftPage={`${episode.length - step}단계 남음`}
                    />
                    {render?.component}
                    <ButtonController
                        className="button"
                        step={step}
                        lastStep={episode.length}
                        path={"/project/make?step="}
                        nextButtonValue={render?.nextButtonValue}
                    />
                </main>
            </ProjectMakeContext.Provider>
        </Wrapper>
    );
}

export default Make;