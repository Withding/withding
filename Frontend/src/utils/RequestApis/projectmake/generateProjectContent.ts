import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 프로젝트 생성시 프로젝트 내용 작성하는 API
 * @returns 
 */
function generateProjectContent({
    content, project
}: {
    content: string;
    project: number;
}): Promise<AxiosResponse> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/2/${project}`,
        method: "PUT",
        headers: {
            "authorization": accessToken,
        },
        data: {
            content
        }
    });
}

export default generateProjectContent;