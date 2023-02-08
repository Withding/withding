import Button from "@/components/common/Button";
import ProjectMakeProductsContext from "@/store/ProjectMakeProductsContext";
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
    const { product, onAddProduct } = useContext(ProjectMakeProductsContext);
    const { values, onChangeValues } = product;

    return (
        <form
            onSubmit={onAddProduct}
            css={SectionStyle}
        >
            <ProductNameInput
                value={values.name}
                onChangeValue={onChangeValues}
            />
            <ProductDescriptionInput
                value={values.description}
                onChangeValue={onChangeValues}
            />
            <ProductPriceInput
                value={values.price.toString()}
                onChangeValue={onChangeValues}
            />
            <ProductShppingPriceInput
                value={values.shippingPrice.toString()}
                onChangeValue={onChangeValues}
            />
            <ProductShippingDay
                value={values.shippingDay}
                onChangeValue={onChangeValues}
            />
            <ProductinventoryInput
                value={values.inventory.toString()}
                onChangeValue={onChangeValues}
            />
            <Button
                value="추가"
                type="submit"
            />
        </form>
    );
}

export default ProductInputForm;
