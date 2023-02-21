import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 프로젝트 생성 최종 검증 API
 * @returns 
 */
function projectFianlCheck(project: number): Promise<AxiosResponse> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/${project}`,
        method: "PATCH",
        headers: {
            "authorization": accessToken,
        },
    });
}

export default projectFianlCheck;