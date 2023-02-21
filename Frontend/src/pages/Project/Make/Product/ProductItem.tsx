import ProjectMakeProductsContext from "@/store/ProjectMakeProductsContext";
import Product from "@/types/Product";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

/**
 * 상품 컴포넌트
 * @returns 
 */
function ProductItem(props: Product & { index: number }) {
    const { onDeleteProduct, onLoadProduct } = useContext(ProjectMakeProductsContext);
    return (
        <li
            css={style}
            onClick={() => onLoadProduct(props.id ?? -1)}
        >
            <span>{`${props.index}. ${props.name}`}</span>
            <RiDeleteBinLine
                onClick={() => onDeleteProduct(props.id ?? -1)}
            />
        </li>
    );
}

const style = css`
    display: flex;
    justify-content: space-between;
    cursor: pointer;


    background-color: var(--white);
    padding: 1rem;

    svg {
        color: var(--coral);
    }

    svg:hover {
        color: var(--red-400);
        font-weight: 800;
    }

    &:hover {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }
`;

export default ProductItem;