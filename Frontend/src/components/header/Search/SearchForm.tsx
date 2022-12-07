import { css } from "@emotion/react";
import React from "react";
import BaseProps from "../../types/BaseProps";
import { CiSearch } from "react-icons/ci";
function SearchForm(props: BaseProps) {
    return (
        <form
            className={props.className}
            css={style}
        >
            <CiSearch />
            <input
                type="search"
                placeholder="새로운 것을 찾으시나요?"
            />
        </form>
    );
}

const style = css`
    position: relative;
    display: flex;
    align-items: center;
    & > svg {
        position: absolute;
        margin-left: 1rem;
        font-size: 1.8rem;
    }
    @media screen and (min-width: 1096px) {
        margin-right: 1.5rem;
        input[type="search"] {
            border-radius: 16px;
            padding-left: 3rem;
            padding-right: 2rem;
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
            border: 1px solid var(--green-200);
            width: 100%;
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 1095px) {
        width: 94%;
        margin-left: 1rem;
        & > svg {
            right: 0;
            margin-right: 1rem;
        }
        input[type="search"] {
            padding-left: 1rem;
            padding-right: 3rem;
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
            border: 1px solid var(--grey-300);
            width: 100%;
            font-size: 0.9rem;
        }
    }
`;

export default SearchForm;