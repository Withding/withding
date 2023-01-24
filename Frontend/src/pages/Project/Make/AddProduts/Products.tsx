import { css } from "@emotion/react";
import React from "react";
import Product from "./Product";

/**
 * 프로젝트 생성시 상품 등록하는 컴포넌트
 * @returns 
 */
function Products() {
    return (
        <ul css={style}>
            <Product />
        </ul>
    );
}

const style = css`
    margin-top: 1rem;
`;

export default Products;