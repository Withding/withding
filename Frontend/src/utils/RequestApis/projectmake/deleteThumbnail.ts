import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
/**
 * 프로젝트 썸네일 삭제 API 
 * @returns 
 */
function deleteThumbnail(id: number): Promise<AxiosResponse> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/thumbnail/${id}`,
        method: "DELETE",
        headers: {
            "authorization": accessToken,
        },
    });
}

export default deleteThumbnail;