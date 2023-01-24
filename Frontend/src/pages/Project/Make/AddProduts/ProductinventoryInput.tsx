import React from "react";
import NumberInput from "@/components/common/NumberInput";

/**
 * 상품 재고 수령 입력
 * @returns 
 */
function ProductinventoryInput() {
    return (
        <NumberInput
            label="상품 재고 수량"
            MAX={10000}
            MIN={1}
            onChangeValue={() => { }}
            input={{
                name: "inventory",
                placeholder: "상품 재고 수량을 입력해주세요.",
                value: "",
            }}
            subDescription="상품 재고 수량을 입력해주세요."
            unit="개"
        />
    );
}

export default ProductinventoryInput;