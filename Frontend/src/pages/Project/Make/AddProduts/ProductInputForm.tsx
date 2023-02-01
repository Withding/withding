import Button from "@/components/common/Button";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import React, { useContext } from "react";
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
    const { product } = useContext(ProjectMakeContext);
    const { values, onChangeValue: onChangeProductValue, addProduct } = product;
    return (
        <form
            onSubmit={addProduct}
            css={SectionStyle}
        >
            <ProductNameInput
                value={values.name}
                onChangeValue={onChangeProductValue}
            />
            <ProductDescriptionInput
                value={values.description}
                onChangeValue={onChangeProductValue}
            />
            <ProductPriceInput
                value={values.price.toString()}
                onChangeValue={onChangeProductValue}
            />
            <ProductShppingPriceInput
                value={values.shippingPrice.toString()}
                onChangeValue={onChangeProductValue}
            />
            <ProductShippingDay
                value={values.shippingDay}
                onChangeValue={onChangeProductValue}
            />
            <ProductinventoryInput
                value={values.inventory.toString()}
                onChangeValue={onChangeProductValue}
            />
            <Button
                value="추가"
                type="submit"
            />
        </form>
    );
}

export default ProductInputForm;
