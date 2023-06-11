import Funding from "@/types/UserFunding";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 내가 작성한 펀딩
 * @returns 
 */
function MyFundingItem(
    props: Funding
) {
    const navigate = useNavigate();
    const onClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        if (props.state === "진행중" || props.state === "종료") {
            // 프로젝트 진행 페이지로
        } else {
            // 프로젝트 생성페이지로
            navigate(`/project/make?step=1&project=${props.id}`);
        }
        event.stopPropagation();
    }, [navigate, props.id, props.state]);
    return (
        <li
            css={style}
            onClick={onClick}
        >
            <figure>
                <img src={props.image} alt="프로젝트 이미지" />
            </figure>
            {
                props.title.length === 0 ?
                    <h1>{"제목을 입력해주세요"}</h1>
                    :
                    <h1>{props.title}</h1>
            }
            <p className="state">{props.state}</p>
        </li>
    );
}

const style = css`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    figure {
        margin-bottom: 0.5rem;
        width: 100%;
        height: 5rem;
        img {
            border-radius: 4px;
        }
    }
    h1 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.9rem;
        font-weight: 600;
    }
    p.state {
        font-size: 0.8rem;
        color: var(--grey-400);
    }
`;

export default MyFundingItem;