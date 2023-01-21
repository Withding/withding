import { css } from "@emotion/react";
import React from "react";

function Category() {
    return (
        <section>
            <label>
                <span>카테고리</span>
                <select
                    css={style}
                >
                    <option value="1">카테고리</option>
                </select>
            </label>
        </section>
    );
}

const style = css`
    all: unset;
    margin-top: 0.5rem;
    appearance: button;
    padding: 0 1rem;
    border: 1px solid var(--grey-200);
    background-color: unset;
    min-height: 48px;
`;

export default Category;