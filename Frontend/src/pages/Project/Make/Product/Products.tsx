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
import editProduct from "@/utils/RequestApis/projectmake/editProduct";

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
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
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

    const { mutate: editProductMutate } = useMutation(editProduct, {
        onSuccess: (response) => {
            if (response.status === 204) {
                const newProducts = products.map((_product) => {
                    if (_product.id === product.id) {
                        return product;
                    }
                    return _product;
                });
                setProducts(newProducts);
                setIsEditMode(false);
                setProduct(PRODUCT_INIT);
            }
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

    const loadProductHandler = useCallback((id: number) => {
        const newProduct = products.find((product) => product.id === id);
        if (newProduct) {
            setProduct(newProduct);
            setIsEditMode(true);
        }
    }, [products]);

    const offEditModeHandelr = useCallback(() => {
        setIsEditMode(() => false);
        setProduct(PRODUCT_INIT);
    }, []);

    const onEditProduct = useCallback(() => {
        editProductMutate({
            _product: product,
            project
        });
    }, [editProductMutate, product, project]);

    return (
        <ProjectMakeProductsContext.Provider value={{
            isEditMode,
            products,
            onAddProduct: addProductHandler,
            onDeleteProduct: deleteProductHandler,
            onResetProduct: resetProductHandler,
            onLoadProduct: loadProductHandler,
            onOffEditMode: offEditModeHandelr,
            onEditProduct: onEditProduct,
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
        </ProjectMakeProductsContext.Provider >
    );
}

export default Products;