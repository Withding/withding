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
import ProjectDetailContent from "./ProjectDetailContent/ProjectDetailContent";
import AddProducts from "./AddProduts/AddProducts";

/**
 * /project/make 페이지 컴포넌트
 * @returns 
 */
function Make() {
    const step = useStepParam();
    const episode: EpisodeType[] = [
        { step: 1, component: <ProjectInfo />, nextButtonValue: "다음", name: "프로젝트 정보 입력" },
        { step: 2, component: <ProjectDetailContent />, nextButtonValue: "다음", name: "프로젝트 상세 내용 입력" },
        { step: 3, component: <AddProducts />, nextButtonValue: "다음", name: "상품 등록" },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  

    const [values, setValues] = useState<ProjectMakeValues>({
        title: "",
        category: "",
        targetAmount: 0,
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        content: "",
    });

    const onChangeContent = useCallback((content: string) => {
        setValues({
            ...values,
            content
        });
    }, [values]);

    const onChangeValue = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = e.target;
            if (name === "bestImage") {
                const { files } = (e.target as HTMLInputElement);
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
                onChangeValue,
                onChangeContent
            }}>
                <ProcedureNavigator
                    list={episode}
                    path={"/project/make?step="}
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
                        path={"/project/make?step="}
                        nextButtonValue={render?.nextButtonValue}
                    />
                </main>
            </ProjectMakeContext.Provider>
        </Wrapper>
    );
}

export default Make;