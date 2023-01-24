import LimitTextInput from "@/components/common/LimitTextInput";
import React from "react";

/**
 * 상품명을 입력하는 컴포넌트
 * @returns 
 */
function ProductNameInput() {
    return (
        <LimitTextInput
            label="상품명"
            input={{
                type: "text",
                placeholder: "상품명을 입력해주세요",
                name: "name",
                value: "",
                maxLength: 20,
                onChange: () => { },
            }} />
    );
}

export default ProductNameInput;