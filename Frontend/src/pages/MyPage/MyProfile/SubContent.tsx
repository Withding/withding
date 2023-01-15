import { css } from "@emotion/react";
import React from "react";


interface SubContentProps {
    title: string;
    children: React.ReactNode;
}

/**
 * 마이페이지 프로필 수정에 사용되는 서브 컨텐츠 컴포넌트
 * @param props.title - 서브 컨텐츠 제목
 * @param props.children - 서브 컨텐츠 내용
 * @returns 
 */
function SubContent(props: SubContentProps) {
    return (
        <section css={style}>
            <h2>{props.title}</h2>
            {props.children}
        </section>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    h2 {
        font-weight: 300;
        margin-bottom: 0.5rem;
    }
`;

export default SubContent;