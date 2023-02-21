import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import ProjectMakeValues  from "@/types/ProjectMakeValues";
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
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/1/${project}`,
        method: "PUT",
        headers: {
            "authorization": accessToken,
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