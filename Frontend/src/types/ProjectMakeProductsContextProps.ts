import Product from "./Product";
import React from "React";

/**
 * ProjectMakeProductsContext Props
 * @interface ProjectMakeProductsContextProps
 * @property {Product[]} products - 상품 리스트
 * @property {(e: React.FormEvent<HTMLElement>) => void} onAddProduct - 상품 추가
 * @property {Product} product.values - 상품 값
 * @property {(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void} 
 * product.onChangeValue - 상품 값 변경
 */
interface ProjectMakeProductsContextProps {
    products: Product[];
    onAddProduct: (e: React.FormEvent<HTMLElement>) => void;
    product: {
        values: Product;
        onChangeValues: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    }

}

export default ProjectMakeProductsContextProps;