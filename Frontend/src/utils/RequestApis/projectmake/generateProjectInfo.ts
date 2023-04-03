import { AxiosResponse } from "axios";
import ProjectMakeValues  from "@/types/ProjectMakeValues";
import httpClient from "@/utils/httpClient";
/**
 * 프로젝트 생성시 프로젝트 정보 작성하는 API
 * @returns 
 */
function generateProjectInfo({
    project, values
}: {
    project: number;
    values: ProjectMakeValues;
}): Promise<AxiosResponse> {
    return httpClient({
        url: `/projects/1/${project}`,
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            title: values.title,
            category: values.category,
            targetAmount: values.targetAmount,
            startDate: values.startDate,
            endDate: values.endDate,
            bestImage: values.bestImage ?? "",
        }
    });
}

export default generateProjectInfo;