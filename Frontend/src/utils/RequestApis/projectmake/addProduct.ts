import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import Product  from "@/types/Product";
/**
 * 프로젝트 상품을 추가하는 API
 * @returns 
 */
function addProduct({
    project,
    values,
}: {
    project: number,
    values: Product
}): Promise<Product> {
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
            ...values,
        }
    }).then(res => res.data);
}

export default addProduct;