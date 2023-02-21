import ProcedureList from "@/components/common/Procedure/ProcedureList";
import ProcedureType from "@/types/ProcedureType";
import React from "react";

/**
 * 프로젝트 등록후 어떤식으로 진행되는지 설명해주는 컴포넌트 
 * @returns 
 */
function After() {
    const procedures: ProcedureType[] = [
        { step: 1, title: "프로젝트 공개", description: "프로젝트가 공개되면 기간동안 진행되요" },
        { step: 2, title: "프로젝트 종료", description: "프로젝트 공개 기간이 만료되면 프로젝트가 자동으로 종료되요" },
        { step: 3, title: "선물/서비스 발송", description: "메이커가 서포터에게 약속한 제품이나 서비스를 준비해 보내면 됩니다. 발송 후에는 발송 상태를 꼭 변경해 주세요." },
        { step: 4, title: "정산", description: "위 과정을 모두 마치면 정산된 포인트는 메이커님에게 전달해드려요" }
    ];
    return (
        <article>
            <h1>프로젝트 공개 후 어떤식으로 진행되는지 알려드려요</h1>
            <p className="description">아래 과정을 잘 숙지해 불이익이 없도록 해주세요.</p>
            <ProcedureList
                list={procedures}
            />
        </article>
    );
}

export default After;