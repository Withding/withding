import AlertBox from "@/components/common/AlertBox";
import React from "react";
import ProductInputForm from "./ProductInputForm";

/**
 * 프로젝트 생성시 물건 등록하는 컴포넌트
 * @returns 
 */
function AddProducts() {
    return (
        <article>
            <h1>상품 등록</h1>
            <p className="description">판매할 상품들을 등록해주세요</p>
            <AlertBox
                value="상품은 최대 5개까지만 등록할 수 있습니다."
            />
            <ProductInputForm />
        </article>
    );
}

export default AddProducts;