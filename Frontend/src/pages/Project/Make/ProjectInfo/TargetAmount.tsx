import NumberInput from "@/components/common/NumberInput";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import React, { useContext, } from "react";

/**
 * 프로젝트 목표 금액을 작성하는 컴포넌트
 * @returns 
 */
function TargetAmount() {
    const { values, onChangeValue } = useContext(ProjectMakeContext);

    return (
        <NumberInput
            label="목표 금액"
            MAX_AMOUNT={1000000000}
            MIN_AMOUNT={1000}
            onChangeValue={onChangeValue}
            input={{
                name: "targetAmount",
                placeholder: "목표 금액을 입력해주세요",
                value: values.targetAmount,
            }}
        />
    );
}

export default TargetAmount;