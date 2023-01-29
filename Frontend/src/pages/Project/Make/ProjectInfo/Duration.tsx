import React, { useContext } from "react";
import Input from "@/components/common/Input";
import { css } from "@emotion/react";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import dateByFormat from "@/utils/dateByFormat";

/**
 * 프로젝트 생성시 기간을 입력하는 컴포넌트
 * @returns 
 */
function Duration() {
    const { values, onChangeValue } = useContext(ProjectMakeContext);
    return (
        <section css={style}>
            <label>
                <span>프로젝트 기간</span>
                <div className="date-box">
                    <Input
                        type="date"
                        min={dateByFormat(new Date(), "-")}
                        max={"9999-01-21"}
                        value={values.startDate}
                        onChange={onChangeValue}
                        name="startDate"
                    />
                    {` ~ `}
                    <Input
                        type="date"
                        min={dateByFormat(new Date(), "-")}
                        max={"9999-01-01"}
                        value={values.endDate}
                        onChange={onChangeValue}
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