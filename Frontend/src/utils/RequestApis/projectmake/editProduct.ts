import Product  from "@/types/Product";
import { AxiosResponse } from "axios";
import httpClient from "@/utils/httpClient";
/**
 * 프로젝트 상품 수정 API
 * @returns 
 */
function editProduct({
    _product,
    project
}: {
    _product: Product;
    project: number;
}): Promise<AxiosResponse> {
    return httpClient({
        url: `/projects/3/${project}`,
        method: "PUT",
        data: {
            ..._product
        }
    });
}

export default editProduct;