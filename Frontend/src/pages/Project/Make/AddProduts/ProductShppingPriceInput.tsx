import NumberInput from "@/components/common/NumberInput";
import React, { useMemo } from "react";

/**
 * 상품 배송비를 입력하는 컴포넌트
 * @returns 
 */
function ProductShppingPriceInput() {
    const MAX_AMOUNT = useMemo(() => 30000, []);
    const MIN_AMOUNT = useMemo(() => 0, []);
    return (
        <NumberInput
            label="배송비"
            MAX={MAX_AMOUNT}
            MIN={MIN_AMOUNT}
            onChangeValue={() => { }}
            input={{
                name: "shppingPrice",
                placeholder: "배송시 발생되는 비용을 입력해주세요.",
                value: "",
            }}
            subDescription={
                `배송비는 ${MIN_AMOUNT.toLocaleString("ko-KR")}원 이상
                ${MAX_AMOUNT.toLocaleString("ko-KR")}원 이하로 설정해주세요.`
            }
            unit="원"
        />
    );
}

export default ProductShppingPriceInput;