import NumberInput from "@/components/common/NumberInput";
import React, { useEffect, useMemo } from "react";
import ProductComponentProps from "./ProductComponentProps";

/**
 * 상품 가격을 입력하는 컴포넌트
 * @returns 
 */
function ProductPriceInput(props: ProductComponentProps) {
    const MAX_AMOUNT = useMemo(() => 5000000, []);
    const MIN_AMOUNT = useMemo(() => 1000, []);

    useEffect(() => {

    }, [props.value]);

    return (
        <NumberInput
            label="상품 가격"
            MAX={MAX_AMOUNT}
            MIN={MIN_AMOUNT}

            input={{
                name: "price",
                placeholder: "상품 가격을 입력해주세요",
                value: props.value,
                onChangeValue: props.onChangeValue
            }}
            subDescription={
                `상품 가격은 ${MIN_AMOUNT.toLocaleString("ko-KR")}원 이상
                ${MAX_AMOUNT.toLocaleString("ko-KR")}원 이하로 설정해주세요.`
            }
            unit="원"
        />
    );
}

export default ProductPriceInput;

