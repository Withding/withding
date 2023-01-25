import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import React, { useCallback, useState } from "react";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import EpisodeType from "@/types/EpisodeType";
import ButtonController from "../ButtonController";
import MainHeader from "../MainHeader";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import ProjectMakeValues from "@/types/ProjectMakeValues";
import ProjectDetailContent from "./ProjectDetailContent/ProjectDetailContent";
import AddProducts from "./AddProduts/AddProducts";
import useProjectParam from "@/hooks/useProjectParam";
import { useMutation, useQuery } from "react-query";
import fetchProjectInfo from "@/utils/RequestApis/projectmake/fetchProjectInfo";
import generateProjectInfo from "@/utils/RequestApis/projectmake/generateProjectInfo";

/**
 * /project/make 페이지 컴포넌트
 * @returns 
 */
function Make() {
    const step = useStepParam();
    const project = useProjectParam();
    const { data, refetch } = useQuery(["fetchStep1Values"], () => fetchProjectInfo(project));
    const { mutate: projectInfoMutate } = useMutation(generateProjectInfo);
    const [values, setValues] = useState<ProjectMakeValues>(data ?? {
        title: "",
        category: "",
        targetAmount: 0,
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        content: "",
    });


    const generateInfo = useCallback((step: number) => {
        if (step === 2) { // 페이지 리프레쉬하면 step1 데이터들이 다날라가서 step2 에서는 기존 데이터를 다시 불러온후 보내야함
            refetch();
        }
        projectInfoMutate({ project, values });
    }, [project, projectInfoMutate, refetch, values]);

    const episode: EpisodeType[] = [
        {
            step: 1,
            component: <ProjectInfo />,
            nextButtonValue: "다음",
            name: "프로젝트 정보 입력",
            clickEvent: () => generateInfo(1)
        },
        {
            step: 2,
            component: <ProjectDetailContent />,
            nextButtonValue: "다음",
            name: "프로젝트 상세 내용 입력",
            clickEvent: () => generateInfo(2)
        },
        {
            step: 3,
            component: <AddProducts />,
            nextButtonValue: "다음",
            name: "상품 등록"
        },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  

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
                        onClick={render?.clickEvent}
                    />
                </main>
            </ProjectMakeContext.Provider>
        </Wrapper>
    );
}

export default Make;