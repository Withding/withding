import { css } from "@emotion/react";
import React from "react";

/**
 * /project 경로 하위 페이지들의 Wrapper 컴포넌트
 * @param props.children React.ReactNode
 * @returns 
 */
function Wrapper(props: { children: React.ReactNode }) {
    return (
        <div css={style}>
            {props.children}
        </div>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: inline-flex;
    line-height: 1.3;

    h1{
        font-weight: 800;
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    p.description {
        font-size: 1.1rem;
        color: var(--grey-500);
        font-weight: 400;
        margin-bottom: 1rem;
    }

    main {
        width: 100%;
        padding: 1rem 2rem;
    }

    .button {
        margin-top: 2rem;
        width: 100%;
    }

    button {
        min-height: 48px;
        text-align: center;
        margin-right: 2rem;
    }

    .next {
        color: var(--white);
        background-color: var(--green-300);
        min-width: 15rem;
    }

    .next:hover {
        background-color: var(--green-400);
    }

    .prev {
        color: var(--grey-500);
    }

    .left-page {
        text-align: right;
        float: right;
        font-size: 0.8rem;
        width: 100%;
        color: var(--grey-400);
        margin-bottom: 1rem;
    }

    @media screen and (min-width: 1096px) {
        aside {
            min-width: 15rem;
            max-width: 16rem;
        }
        main {
            border-left: 1px solid var(--grey-200);
        }

        main > article {
            max-width: 800px;
        }
    }

    @media screen and (max-width: 1095px) {
        /* aside {
            display: none;
        } */

        .next {
            width: 20%;
        }
        .prev {
            width: 20%;
        }

        main > article {
            max-width: 100%;
        }
    }
`;

export default Wrapper;