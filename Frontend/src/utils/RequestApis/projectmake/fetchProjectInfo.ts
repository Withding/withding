import ProjectMakeValues from "@/types/ProjectMakeValues";
import httpClient from "@/utils/httpClient";

/**
 * 특정 프로젝트의 정보를 가져오는 API
 * @returns 
 */
function fetchProjectInfo(id: number | string): Promise<ProjectMakeValues> {
    return httpClient({
        url: `/projects/1/${id}`,
        method: "GET",
    }).then(res => res.data);
}

export default fetchProjectInfo;