import ProjectMakeContext from "@/store/ProjectMakeContext";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import InputForm from "./InputForm";
import fetchProjectContent from "@/utils/RequestApis/projectmake/fetchProjectContent";

/**
 * /project/make?step=2
 * 프로젝트 상세 내용을 입력하는 설명을 담은 컴포넌트
 * @returns 
 */
function ProjectDetailContent() {
    const { onChangeContent, project } = useContext(ProjectMakeContext);
    const { data } = useQuery(["fetchStep2Values", project], () => fetchProjectContent(project), {
        onSuccess: (data) => {
            console.log(data.content);
            onChangeContent(data.content);
        }
    });

    return (
        <article css={style}>
            <h1>프로젝트 상세 내용 입력</h1>
            <p className="description">프로젝트를 상세하게 설명해주세요.</p>
            <InputForm />
        </article>
    );
}

const style = css`
    width: 100%;
`;

export default ProjectDetailContent;