import AlertBox from "@/components/common/AlertBox";
import ProcedureList from "@/components/common/Procedure/ProcedureList";
import ProcedureType from "@/types/ProcedureType";
import { css } from "@emotion/react";
import React from "react";
import { IoAlertCircle } from "react-icons/io5";

/**
 * /project/make?step=2 페이지 컴포넌트
 * 프로젝트 생성시 진행 단계를 보여주는 페이지
 * @returns 
 */
function Ready() {
    const procedures: ProcedureType[] = [
        { step: 1, title: "1단계: 프로젝트 생성", description: "필수 항목들을 작성해 제출하시면 됩니다." },
        { step: 2, title: "2단계:프로젝트 검토", description: "작성한 내용들을 어떤식으로 게시되는지 미리 보고 검토할 수 있답니다." },
        { step: 3, title: "3단계:프로젝트 공개", description: "모든 준비가 끝난 프로젝트를 언제 공개할지 메이커님의 최종 승인이 필요해요." },
    ];
    return (
        <article css={style}>
            <h1>{`프로젝트는 총 ${procedures.length}단계로 생성돼요`}</h1>
            <p className="description">멋진 프로젝트를 완성시키기 위해 필요한 단계들이랍니다.</p>
            <AlertBox
                value={"모든 단계를 거쳐야 성공적으로 등록할 수 있어요"}
            />
            <ProcedureList
                list={procedures}
            />
        </article>
    );
}

const style = css`
    max-width: 600px;
`;

export default Ready;