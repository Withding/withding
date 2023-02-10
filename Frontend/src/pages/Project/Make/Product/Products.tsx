import AlertBox from "@/components/common/AlertBox";
import React, { useCallback, useState } from "react";
import ProductInputForm from "./ProductInputForm";
import { useMutation, useQuery } from "react-query";
import useProjectParam from "@/hooks/useProjectParam";
import fetchProductList from "@/utils/RequestApis/projectmake/fetchProductList";
import ProjectMakeProductsContext from "@/store/ProjectMakeProductsContext";
import Product from "@/types/Product";
import ProductsList from "./ProductsList";
import addProduct from "@/utils/RequestApis/projectmake/addProduct";
import deleteProduct from "@/utils/RequestApis/projectmake/deleteProduct";

const PRODUCT_INIT = {
    description: "",
    price: 0,
    shippingPrice: 0,
    shippingDay: "",
    inventory: 0,
    name: "",
    image: null
};

/**
 * 프로젝트 생성시 물건 등록하는 컴포넌트
 * @returns 
 */
function Products() {
    const project = useProjectParam();
    const { data } = useQuery(["makeProductList", project], () => fetchProductList(project), {
    });

    const [product, setProduct] = useState<Product>(PRODUCT_INIT);
    const [products, setProducts] = useState<Product[]>(data?.articles ?? []);

    // 프로젝트 상품 추가 요청
    const { mutate: addProductMutate } = useMutation(addProduct, {
        onSuccess: (data) => {
            setProducts(() => products.concat(data));
            setProduct(PRODUCT_INIT);
        }
    });

    // 프로젝트 상품 삭제 요청
    const { mutate: deleteProductMutate } = useMutation(deleteProduct, {
        onSuccess: (obj: { status: number, productId: number }) => {
            if (obj.status === 204)
                setProducts(products.filter((product) => product.id !== obj.productId));
        }
    });

    const onChangeProductValue =
        useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = e.target;
            setProduct({
                ...product,
                [name]: value
            });
        }, [product]);

    const isProductValid = useCallback(() => {
        if (
            product.description === "" ||
            product.price < 1000 ||
            product.name === "" ||
            product.shippingPrice === 0 ||
            product.shippingDay === "" ||
            product.inventory === 0
        ) {
            return false;
        }
        else
            return true;
    }, [product]);

    const addProductHandler = useCallback((e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (!isProductValid()) return;
        addProductMutate({ project, values: product });
    }, [addProductMutate, product, project, isProductValid]);

    const deleteProductHandler = useCallback((id: number) => {
        deleteProductMutate({ project, productId: id });
    }, [deleteProductMutate, project]);

    const resetProductHandler = useCallback(() => {
        setProduct(PRODUCT_INIT);
    }, []);
    return (
        <ProjectMakeProductsContext.Provider value={{
            products,
            onAddProduct: addProductHandler,
            onDeleteProduct: deleteProductHandler,
            onResetProduct: resetProductHandler,
            product: {
                values: product,
                onChangeValues: onChangeProductValue
            }
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