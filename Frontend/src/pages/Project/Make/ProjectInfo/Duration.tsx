import React from "react";
import Input from "@/components/common/Input";
import { css } from "@emotion/react";
import dateByFormat from "@/utils/dateByFormat";

/**
 * 프로젝트 생성시 기간을 입력하는 컴포넌트
 * @returns 
 */
function Duration(props: {
    values: {
        startDate: string;
        endDate: string;
    }
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <section css={style}>
            <label>
                <span>프로젝트 기간</span>
                <div className="date-box">
                    <Input
                        type="date"
                        min={dateByFormat(new Date(), "-")}
                        max={"9999-01-21"}
                        value={props.values.startDate}
                        onChange={props.onChangeValue}
                        name="startDate"
                    />
                    {` ~ `}
                    <Input
                        type="date"
                        min={dateByFormat(new Date(), "-")}
                        max={"9999-01-01"}
                        value={props.values.endDate}
                        onChange={props.onChangeValue}
                        name="endDate"
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