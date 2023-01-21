import React from "react";
import Input from "@/components/common/Input";
import { css } from "@emotion/react";

/**
 * 프로젝트 생성시 기간을 입력하는 컴포넌트
 * @returns 
 */
function Duration() {
    return (
        <section css={style}>
            <label>
                <span>프로젝트 기간</span>
                <div className="date-box">
                    <Input
                        type="date"
                        min={"2023-01-20"}
                        max={"9999-01-21"}
                    />
                    {` ~ `}
                    <Input
                        type="date"
                        min={"2023-01-20"}
                        max={"9999-01-01"}
                    />
                </div>
            </label>
        </section >
    );
}

const style = css`
    .date-box {
        display: inline-flex;
        align-items: center;
    }
`;

export default Duration;