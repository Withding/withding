import httpClient from "@/utils/httpClient";

/**
 * 특정 프로젝트의 내용을 가져오는 API
 * @returns 
 */
function fetchProjectContent(id: number | string): Promise<{
    content: string;
}> {
    return httpClient({
        url: `/projects/2/${id}`,
        method: "GET",
    }).then(res => res.data);
}

export default fetchProjectContent;