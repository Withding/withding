import httpClient from "@/utils/httpClient";
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
    return httpClient({
        url: `/projects/2/${project}`,
        method: "PUT",
        data: {
            content
        }
    });
}

export default generateProjectContent;