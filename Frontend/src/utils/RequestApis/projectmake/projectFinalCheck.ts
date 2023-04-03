import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";

/**
 * 프로젝트 생성 최종 검증 API
 * @returns 
 */
function projectFianlCheck(project: number): Promise<AxiosResponse> {
    return httpClient({
        url: `/projects/${project}`,
        method: "PATCH",
    });
}

export default projectFianlCheck;