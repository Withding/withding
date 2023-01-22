import Input from "@/components/common/Input";
import { css } from "@emotion/react";
import React from "react";

/**
 * 프로젝트 목표 금액을 작성하는 컴포넌트
 * @returns 
 */
function TargetAmount() {
    return (
        <section css={style}>
            <label>
                <span>목표 금액</span>
                <span className="sub-description">
                    {"목표 금액은 1,000원 이상 10,000,0000원 이하로 설정해주세요."}
                </span>
                <Input
                    type="text"
                    placeholder="목표 금액을 입력해주세요"
                />
            </label>
        </section>
    );
}

const style = css`
    .sub-description {
        margin-top: 1rem;
    }
`;

export default TargetAmount;