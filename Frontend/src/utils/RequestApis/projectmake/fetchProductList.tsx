import Product from "@/types/Product";
import customAxios from "@/utils/customAxios";
import httpClient from "@/utils/httpClient";

/**
 * 프로젝트 상품들 리스트를 가져오는  API
 * @returns 
 */
function fetchProductList(project: number): Promise<{ articles: Product[] }> {
    return httpClient({
        url: `/projects/3/${project}`,
        method: "GET",
    }).then(res => res.data);
}

export default fetchProductList;