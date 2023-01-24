import LimitTextInput from "@/components/common/LimitTextInput";
import NumberInput from "@/components/common/NumberInput";
import React from "react";
import SectionStyle from "../SectionStyle";

/**
 * 프로젝트 생성시 상품 정보를 입력하는 컴포넌트
 * @returns 
 */
function ProductInputForm() {
    return (
        <form css={SectionStyle}>
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
            < NumberInput
                label="상품 가격"
                MAX_AMOUNT={5000000}
                MIN_AMOUNT={1000}
                onChangeValue={() => { }}
                input={{
                    name: "price",
                    placeholder: "상품 가격을 입력해주세요",
                    value: "",
                }}
            />
            < NumberInput
                label="배송비"
                MAX_AMOUNT={30000}
                MIN_AMOUNT={0}
                onChangeValue={() => { }}
                input={{
                    name: "shppingPrice",
                    placeholder: "배송시 발생되는 비용을 입력해주세요.",
                    value: "",
                }}
            />
        </form>
    );
}

export default ProductInputForm;