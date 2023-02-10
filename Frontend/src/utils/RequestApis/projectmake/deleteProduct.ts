
import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 프로젝트 상품 삭제 API 
 * @returns 
 */
function deleteProduct({ project, productId }: { project: number, productId: number}): Promise<{
    status: number
    productId: number
}> {
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
    }).then((res:AxiosResponse) => {
        return {
            status: res.status,
            productId: productId
        };
    });
}

export default deleteProduct;