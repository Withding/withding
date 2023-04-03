import Product  from "@/types/Product";
import httpClient from "@/utils/httpClient";
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
    return httpClient({
        url: `/projects/3/${project}`,
        method: "POST",
        data: {
            ...values,
        }
    }).then(res => res.data);
}

export default addProduct;