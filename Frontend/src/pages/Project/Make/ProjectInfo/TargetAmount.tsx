import NumberInput from "@/components/common/NumberInput";
import React, { useMemo, } from "react";
import ProjectInfoComponentProps from "./ProjectInfComponentProps";

/**
 * 프로젝트 목표 금액을 작성하는 컴포넌트
 * @returns 
 */
function TargetAmount(props: ProjectInfoComponentProps) {
    const MAX_AMOUNT = useMemo(() => 1000000000, []);
    const MIN_AMOUNT = useMemo(() => 1000, []);
    return (
        <NumberInput
            label="목표 금액"
            MAX={MAX_AMOUNT}
            MIN={MIN_AMOUNT}

            input={{
                name: "targetAmount",
                placeholder: "목표 금액을 입력해주세요",
                value: props.value || 0,
                onChangeValue: props.onChangeValue
            }}
            subDescription={
                `금액은 ${MIN_AMOUNT.toLocaleString("ko-KR")}원 이상
                ${MAX_AMOUNT.toLocaleString("ko-KR")}원 이하로 설정해주세요.`
            }
            unit="원"
        />
    );
}

export default TargetAmount;