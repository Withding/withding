import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";

/**
 * 프로젝트 상품 삭제 API 
 * @returns 
 */
function deleteProduct({ project, productId }: { project: number, productId: number}): Promise<{
    status: number
    productId: number
}> {
    return httpClient({
        url: `/projects/3/${project}`,
        method: "DELETE",
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