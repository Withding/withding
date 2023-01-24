import customAxios from "@/utils/customAxios";
import ProjectMakeValues from "@/types/ProjectMakeValues";


/**
 * 특정 프로젝트의 정보를 가져오는 API
 * @returns 
 */
function fetchProjectInfo(id: number | string): Promise<ProjectMakeValues> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/1/${id}`,
        method: "GET",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default fetchProjectInfo;