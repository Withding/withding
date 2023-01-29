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
import generateProjectContent from "@/utils/RequestApis/projectmake/generateProjectContent";
import generateProjectInfo from "@/utils/RequestApis/projectmake/generateProjectInfo";
/**
 * /project/make 페이지 컴포넌트
 * @returns 
 */
function Make() {
    const step = useStepParam();
    const project = useProjectParam();
    const { data } = useQuery(["fetchStep1Values", project], () => fetchProjectInfo(project));
    const { mutate: projectInfoMutate } = useMutation(generateProjectInfo);
    const { mutate: projectContentMutate } = useMutation(generateProjectContent);
    const [values, setValues] = useState<ProjectMakeValues>(data ?? {
        title: "",
        category: -1,
        targetAmount: 0,
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        content: "",
    });


    const generateInfo = useCallback(() => {
        projectInfoMutate({ project, values });
    }, [project, projectInfoMutate, values]);

    const generateProjectContext = useCallback(() => {
        projectContentMutate({ content: values.content, project });
    }, [project, projectContentMutate, values.content]);

    const episode: EpisodeType[] = [
        {
            step: 1,
            component: <ProjectInfo />,
            nextButtonValue: "다음",
            name: "프로젝트 정보 입력",
            clickEvent: generateInfo
        },
        {
            step: 2,
            component: <ProjectDetailContent />,
            nextButtonValue: "다음",
            name: "프로젝트 상세 내용 입력",
            clickEvent: generateProjectContext
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
                    path={`/project/make?project=${project}&step=`}
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
                        path={`/project/make?project=${project}&step=`}
                        nextButtonValue={render?.nextButtonValue}
                        onClick={render?.clickEvent}
                    />
                </main>
            </ProjectMakeContext.Provider>
        </Wrapper>
    );
}

export default Make;