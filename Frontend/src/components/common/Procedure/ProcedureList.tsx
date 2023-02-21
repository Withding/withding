import React from "react";
import ProcedureType from "@/types/ProcedureType";
import { css } from "@emotion/react";
import Procedure from "./Procedure";

/**
 * 진행과정 리스트 컴포넌트
 * @param props.list ProcedureType[] 프로젝트 생성 단계 리스트
 * @returns 
 */
function ProcedureList({ list }: { list: ProcedureType[] }) {
    return (
        <ul css={style}>
            {list.map((procedure) => (
                <Procedure
                    key={procedure.step}
                    {...procedure}
                />
            ))}
        </ul>
    );
}

const style = css`
    margin-top: 3rem;
    width: 100%;
    margin-left: 1rem;
`;

export default ProcedureList;