import LimitTextInput from "@/components/common/LimitTextInput";
import React from "react";
import ProductComponentProps from "./ProductComponentProps";

/**
 * 상품 설명을 입력하는 컴포넌트
 * @returns 
 */
function ProductDescriptionInput(props: ProductComponentProps) {
    return (
        <LimitTextInput
            label="상품 설명"
            input={{
                type: "text",
                placeholder: "상품 설명을 입력해주세요",
                name: "description",
                value: props.value,
                maxLength: 40,
            }}
            onChangeValue={props.onChangeValue}
        />

    );
}

export default ProductDescriptionInput;