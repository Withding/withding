import React from "react";
import SubContent from "../SubContent";
import SubContentListType from "@/types/SubContentListType";
import { AiOutlineHeart } from "react-icons/ai";
import { MdAccountBalance } from "react-icons/md";

/**
 * 마이페이지 메인 서포터 나의 활동이라는 서브 컨텐트 컴포넌트
 * @returns 
 */
function MyActive() {
    const list: SubContentListType[] = [
        { icon: <AiOutlineHeart />, name: "찜하기", navigation: "/mypage/wish" },
        { icon: <MdAccountBalance />, name: "포인트 사용 내역", navigation: "/mypage/point" },
    ];
    return (
        <SubContent
            title="나의 활동"
            list={list}
        />
    );
}

export default MyActive;