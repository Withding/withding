import customAxios from "@/utils/customAxios";
import Product  from "@/types/Product";
import { AxiosResponse } from "axios";
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
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/3/${project}`,
        method: "PUT",
        headers: {
            "authorization": accessToken,
        },
        data: {
            ..._product
        }
    });
}

export default editProduct;