import Product from "@/types/Product";
import customAxios from "@/utils/customAxios";

/**
 * 프로젝트 상품들 리스트를 가져오는  API
 * @returns 
 */
function fetchProductList(project: number): Promise<{ articles: Product[] }> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/3/${project}`,
        method: "GET",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default fetchProductList;