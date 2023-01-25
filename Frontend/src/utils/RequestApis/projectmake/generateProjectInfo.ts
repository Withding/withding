import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import ProjectMakeValues  from "@/types/ProjectMakeValues";
/**
 * 카테고리 목록 가져오기
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
        url: "/projects/1",
        method: "PUT",
        headers: {
            "authorization": accessToken,
            "Content-Type": "multipart/form-data",
        },
        data: {
            id: project,
            title: values.title,
            category: values.category,
            targetAmount: values.targetAmount,
            startDate: values.startDate,
            endDate: values.endDate,
            bestImage: values.bestImage,
            content: values.content,
        }
    });
}

export default generateProjectInfo;