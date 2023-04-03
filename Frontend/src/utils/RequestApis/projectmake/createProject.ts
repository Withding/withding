import httpClient from "@/utils/httpClient";

/**
 * 프로젝트 생성후 프로젝트 번호를 받아오는 API
 * @returns 
 */
function createProject(): Promise<{ id: string}> {
    return httpClient({
        url: "/projects",
        method: "POST",
    }).then(res => res.data);
}

export default createProject;