import Button from "@/components/common/Button";
import ProjectMakeProductsContext from "@/store/ProjectMakeProductsContext";
import { css } from "@emotion/react";
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
    const { product, onAddProduct, onResetProduct } = useContext(ProjectMakeProductsContext);
    const { values, onChangeValues } = product;
    return (
        <form
            onSubmit={onAddProduct}
            css={[SectionStyle, style]}
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
            <Button
                onClick={onResetProduct}
                value="초기화"
                type="reset"
            />
        </form>
    );
}

const style = css`
    button {
        min-width: 8rem;
        color: white;
    }
    button[type="submit"] {
        background-color: var(--blue-200);
    }

    button[type="submit"]:hover  {
        background-color: var(--blue-300);
    }

    button[type="reset"] {
        background-color: var(--red-200);
    }

    button[type="reset"]:hover {
        background-color: var(--red-300);
    }
`;

export default ProductInputForm;
