import Category from "@/types/Category";
import customAxios from "@/utils/customAxios";
import httpClient from "@/utils/httpClient";
/**
 * 카테고리 목록 가져오기
 * @returns 
 */
function fetchCategorys(): Promise<{ categoryList: Category[]}> {
    return httpClient({
        url: "/categorys",
        method: "GET",
    }).then(res => res.data);
}

export default fetchCategorys;