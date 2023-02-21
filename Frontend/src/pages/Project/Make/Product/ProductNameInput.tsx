import LimitTextInput from "@/components/common/LimitTextInput";
import React from "react";
import ProductComponentProps from "./ProductComponentProps";

/**
 * 상품명을 입력하는 컴포넌트
 * @returns 
 */
function ProductNameInput(props: ProductComponentProps) {
    return (
        <LimitTextInput
            label="상품명"
            input={{
                type: "text",
                placeholder: "상품명을 입력해주세요",
                name: "name",
                value: props.value,
                maxLength: 20,
            }}
            onChangeValue={props.onChangeValue}
        />
    );
}

export default ProductNameInput;