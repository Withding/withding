import Category from "@/types/Category";
import customAxios from "@/utils/customAxios";
/**
 * 카테고리 목록 가져오기
 * @returns 
 */
function fetchCategorys(): Promise<{ categoryList: Category[]}> {
    const axios = customAxios();
    return axios({
        url: "/category",
        method: "GET",
    }).then(res => res.data);
}

export default fetchCategorys;