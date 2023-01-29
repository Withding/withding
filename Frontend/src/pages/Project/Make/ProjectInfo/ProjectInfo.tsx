import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import InputForm from "./InputForm";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import fetchProjectInfo from "@/utils/RequestApis/projectmake/fetchProjectInfo";
import ProjectMakeValues from "@/types/ProjectMakeValues";

/**
 * 프로젝트 정보를 입력하는 컴포넌트
 * @returns 
 */
function ProjectInfo() {
    const { project, onChangeStep1Values } = useContext(ProjectMakeContext);

    const { data } = useQuery(["fetchStep1Values", project], () => fetchProjectInfo(project), {
        onSuccess: (data: ProjectMakeValues) => {
            onChangeStep1Values(data);
        }
    });

    return (
        <article css={style}>
            <h1>프로젝트 정보 입력</h1>
            <p className="description">프로젝트를 생성하기 위한 정보들을 작성해주세요.</p>
            <InputForm />
        </article>
    );
}


const style = css`
    .form {
        margin-top: 1rem;
    }

    @media screen and (min-width: 1096px){
        max-width: 700px;
    }
    @media screen and (max-width: 1095px){
        width: 100%;
    }
`;

export default ProjectInfo;