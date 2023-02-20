import { css } from "@emotion/react";
import React from "react";
import MyFundingList from "./MyFundingList";
import { useQuery } from "react-query";
import fetchMyFunding from "@/utils/RequestApis/funding/fetchMyFunding";

/**
 * 내가 작성한 펀딩 목록
 * @returns 
 */
function MyFunding() {
    const { data } = useQuery(["makerMyFunding"], () => fetchMyFunding({}), {
        useErrorBoundary: false,
        suspense: false
    });
    return (
        <section
            css={style}
        >
            <p className="more">더보기</p>
            <span><p className="title">만든 프로젝트</p><b className="funding-count">{data?.fundingCount}</b></span>
            <MyFundingList
                list={data?.fundingList}
            />
        </section>
    );
}


const style = css`
    display: flex;
    flex-direction: column;
    .more {
        font-size: 0.8rem;
        color: var(--grey-400);
        cursor: pointer;
        text-align: right;
    }

    span {
        font-size: 1.1rem;
        font-weight: 600;
        display: inline-flex;
        b {
            margin-left: 0.5rem;
            color: var(--blue-300);
        }
    }

    ul {
        width: 100%;
    }
`;
export default MyFunding;