import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 프로젝트 상품 삭제 API 
 * @returns 
 */
function deleteProduct({ project, productId }: { project: number, productId: number}): Promise<AxiosResponse> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/3/${project}`,
        method: "DELETE",
        headers: {
            "authorization": accessToken,
        },
        data: {
            id: productId
        }
    });
}

export default deleteProduct;