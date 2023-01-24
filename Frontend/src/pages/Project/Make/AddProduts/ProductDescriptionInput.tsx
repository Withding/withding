import LimitTextInput from "@/components/common/LimitTextInput";
import React from "react";

/**
 * 상품 설명을 입력하는 컴포넌트
 * @returns 
 */
function ProductDescriptionInput() {
    return (
        <LimitTextInput
            label="상품 설명"
            input={{
                type: "text",
                placeholder: "상품 설명을 입력해주세요",
                name: "description",
                value: "",
                maxLength: 40,
                onChange: () => { },
            }} />
    );
}

export default ProductDescriptionInput;