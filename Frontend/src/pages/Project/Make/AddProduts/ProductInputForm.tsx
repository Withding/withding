import React from "react";
import SectionStyle from "../SectionStyle";
import ProductDescriptionInput from "./ProductDescriptionInput";
import ProductinventoryInput from "./ProductinventoryInput";
import ProductNameInput from "./ProductNameInput";
import ProductPriceInput from "./ProductPriceInput";
import ProductShippingDay from "./ProductShippingDay";
import ProductShppingPriceInput from "./ProductShppingPriceInput";

/**
 * 프로젝트 생성시 상품 정보를 입력하는 컴포넌트
 * @returns 
 */
function ProductInputForm() {

    return (
        <form css={SectionStyle}>
            <ProductNameInput />
            <ProductDescriptionInput />
            <ProductPriceInput />
            <ProductShppingPriceInput />
            <ProductShippingDay />
            <ProductinventoryInput />
        </form>
    );
}

export default ProductInputForm;
