import React from "react";
import LabelInput from "@/components/common/LabelInput";

/**
 * 상품 발송 날짜 입력
 * @returns 
 */
function ProductShippingDay() {
    return (
        <section>
            <LabelInput
                label="상품 발송 날짜"
                input={{
                    type: "date",
                }}
                subDescription="프로젝트 종료이후 상품이 발송되는 날짜를 입력해주세요."
            />
        </section>
    );
}

export default ProductShippingDay;