import React from "react";
import { css } from "@emotion/react";
import ProductInputForm from "./ProductInputForm";

/**
 * 프로젝트 생성시 상품 컴포넌트
 * @returns 
 */
function Product() {
    return (
        <li css={style}>
            <ProductInputForm />
        </li>
    );
}

const style = css`
    span {
        font-size: 1.2rem;
        color: var(--grey-500);
    }
    input {
        min-height: 48px;
        padding: 1rem;
    }
`;

export default Product;