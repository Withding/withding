import AlertBox from "@/components/common/AlertBox";
import React from "react";
import ProductInputForm from "./ProductInputForm";
import { useQuery } from "react-query";
import useProjectParam from "@/hooks/useProjectParam";
import fetchProductList from "@/utils/RequestApis/projectmake/fetchProductList";
import ProjectMakeProductsContext from "@/store/ProjectMakeProductsContext";
import Product from "@/types/Product";
import ProductsList from "./ProductsList";

/**
 * 프로젝트 생성시 물건 등록하는 컴포넌트
 * @returns 
 */
function Products() {
    const project = useProjectParam();
    const [products, setProducts] = React.useState<Product[]>([
        {
            name: "test",
            description: "test",
            price: 1000,
            shippingPrice: 1000,
            shippingDay: "test",
            inventory: 1000,
        },
        {
            name: "test",
            description: "test",
            price: 1000,
            shippingPrice: 1000,
            shippingDay: "test",
            inventory: 1000,
        },
        {
            name: "test",
            description: "test",
            price: 1000,
            shippingPrice: 1000,
            shippingDay: "test",
            inventory: 1000,
        }

    ]);
    const { data } = useQuery(["makeProductList", project], () => fetchProductList(project), {
        useErrorBoundary: false,
        onSuccess: (data) => {
            setProducts(data.articles);
        }
    });

    return (
        <ProjectMakeProductsContext.Provider value={{
            products,
        }}>
            <article>
                <h1>상품 등록</h1>
                <p className="description">판매할 상품들을 등록해주세요</p>
                <AlertBox
                    value="상품은 최대 5개까지만 등록할 수 있습니다."
                />
                <ProductsList />
                <ProductInputForm />
            </article>
        </ProjectMakeProductsContext.Provider>
    );
}

export default Products;