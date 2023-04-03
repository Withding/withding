import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";
/**
 * 프로젝트 썸네일 삭제 API 
 * @returns 
 */
function deleteThumbnail(id: number): Promise<AxiosResponse> {
    return httpClient({
        url: `/projects/thumbnail/${id}`,
        method: "DELETE",
    });
}

export default deleteThumbnail;