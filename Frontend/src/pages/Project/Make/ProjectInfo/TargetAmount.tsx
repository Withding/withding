import Input from "@/components/common/Input";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import { css } from "@emotion/react";
import React, { useCallback, useContext, useMemo, useState } from "react";

/**
 * 프로젝트 목표 금액을 작성하는 컴포넌트
 * @returns 
 */
function TargetAmount() {
    const { values, onChangeValue } = useContext(ProjectMakeContext);
    const [newAmount, setNewAmount] = useState("");
    const [error, setError] = useState(false);
    const MAX_AMOUNT = useMemo(() => 100000000, []);
    const MIN_AMOUNT = useMemo(() => 1000, []);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newValue = value.replaceAll(",", "");
        if (!parseInt(value)) {
            return;
        }
        if (parseInt(newValue) > MAX_AMOUNT) {
            setNewAmount(() => MAX_AMOUNT.toLocaleString("ko-KR"));
            e.target.value = MAX_AMOUNT.toString();
            onChangeValue(e);
            return;
        }
        if (parseInt(newValue) >= MIN_AMOUNT) setError(() => false);
        setNewAmount(() => parseInt(newValue).toLocaleString("ko-KR"));
        e.target.value = newValue;
        onChangeValue(e);
    }, [MAX_AMOUNT, MIN_AMOUNT, onChangeValue]);

    const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (values.targetAmount < MIN_AMOUNT) {
            setError(() => true);
        } else {
            setError(() => false);
        }
    }, [MIN_AMOUNT, values.targetAmount]);

    return (
        <section css={style}>
            <label>
                <span>목표 금액</span>
                <span className="sub-description">
                    {`목표 금액은 ${MIN_AMOUNT.toLocaleString("ko-KR")}원 이상
                    ${MAX_AMOUNT.toLocaleString("ko-KR")}원 이하로 설정해주세요.`}
                </span>
                <div>
                    <Input
                        className={`${error ? "error" : ""}`}
                        type="text"
                        placeholder="목표 금액을 입력해주세요"
                        value={newAmount}
                        onChange={onChange}
                        name={"targetAmount"}
                        onBlur={onBlur}
                    />
                    <span>{"원"}</span>
                </div>

            </label>
        </section>
    );
}

const style = css`
    .sub-description {
        margin-top: 1rem;
    }

    div {
        display: inline-flex;
        align-items: center;
        span {
            margin-left: 0.5rem;
        }
    }

    input.error {
        outline: 1px solid #ff0000;
        background-color: #ffebeb;
    }
`;

export default TargetAmount;