import Input from "@/components/common/Input";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import { css } from "@emotion/react";
import React, { useCallback, useContext, useState } from "react";

/**
 * 프로젝트 목표 금액을 작성하는 컴포넌트
 * @returns 
 */
function TargetAmount() {
    const { onChangeValue } = useContext(ProjectMakeContext);
    const [newAmount, setNewAmount] = useState("");

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!parseInt(value)) {
            return;
        }
        const newValue = value.replaceAll(",", "");
        setNewAmount(() => parseInt(newValue).toLocaleString("ko-KR"));
        e.target.value = newValue;
        onChangeValue(e);
    }, [onChangeValue]);

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
                    value={newAmount}
                    onChange={onChange}
                    name={"targetAmount"}
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