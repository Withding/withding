import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import React from "react";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";

/**
 * /project/make 페이지 컴포넌트
 * @returns 
 */
function Make() {
    const step = useStepParam();
    console.log(typeof step);
    // const episode: EpisodeType[] = [
    //     //     { step: 1, component: <Start />, nextButtonValue: "좋아요", name: "시작하기" },
    //     //     { step: 2, component: <Ready />, nextButtonValue: "다음", name: "프로젝트 생성 진행단계" },
    //     //     { step: 3, component: <After />, nextButtonValue: "다음", name: "프로젝트 공개후 진행단계" },
    //     //     { step: 4, component: <Final />, nextButtonValue: "시작하기", name: "정산" },
    // ];
    return (
        <Wrapper>

            {/* <ProcedureNavigator
                list={episode}
                path={"/project/make?step="}
                currnet={1}
            /> */}
        </Wrapper>
    );
}

export default Make;