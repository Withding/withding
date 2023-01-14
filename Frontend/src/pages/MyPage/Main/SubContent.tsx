import SubContentListType from "@/types/SubContentListType";
import { css } from "@emotion/react";
import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface SubContentProps {
    title: string;
    list: SubContentListType[];
}


function Item(props: SubContentListType) {
    const navigate = useNavigate();
    return (
        <li onClick={() => navigate(props.navigation)}>
            <div className="info">
                {props.icon}
                <a>{props.name}</a>
            </div>
            <MdOutlineNavigateNext className={"next"} />
        </li>
    );
}

/**
 * 마이페이지 서브메뉴
 * @param props.title - 서브메뉴 이름
 * @param props.children - 서브메뉴 내용
 * @returns 
 */
function SubContent(props: SubContentProps) {
    return (
        <section css={style}>
            <h3>{props.title}</h3>
            <ul>
                {props.list.map((item: SubContentListType, index: number) => (
                    <Item
                        key={index}
                        {...item}
                    />
                ))}
            </ul>
        </section>
    );
}

const style = css`
    width: 100%;
    h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom : 1rem;
    }

    ul {
        width :100%;
        display: flex;
        justify-content: row;
        flex-wrap: wrap;
        align-items: center;
        li {
            margin-top: 1rem;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            width: 50%;
            font-weight: 300;
            border-bottom: 1px solid var(--grey-200);
            padding-bottom: 1rem;
            color: var(--grey-500);
            .info {
                display: inline-flex;
                align-items: center;
            }
            
            .next { 
                color: var(--grey-300);
            }

            svg {
                font-size: 1.5rem;
                margin-right: 0.5rem;
            }
        }
    }

    // 모바일
    @media screen and (max-width: 1095px){
        ul {
            li {
                width: 100%;
            }
        }
    }
`;

export default SubContent;