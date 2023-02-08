import ProjectMakeProductsContext from "@/store/ProjectMakeProductsContext";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import ProductItem from "./ProductItem";

/**
 * 상품 리스트 컴포넌트
 * @returns 
 */
function ProductsList() {
    const { products } = useContext(ProjectMakeProductsContext);
    return (
        <ul css={style}>
            {products.map((product, index) => (
                <ProductItem
                    key={index}
                    {...product}
                    index={index = 1}
                />
            ))}
        </ul>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    margin-bottom:  1rem;
    
    background-color: var(--grey-100);
    padding: 1rem;
    border-radius: 8px;

    li:not(:last-child) {
        margin-bottom: 1rem;
    }

  
`;

export default ProductsList;