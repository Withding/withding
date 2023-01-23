import React from "react";
import LabelInput from "@/components/common/LabelInput";
import { css } from "@emotion/react";
import TitleInput from "../../../../components/common/LimitTextInput";

/**
 * 프로젝트 생성시 상품 컴포넌트
 * @returns 
 */
function Product() {
    return (
        <li css={style}>
            <TitleInput
                label="상품명"
                input={{
                    type: "text",
                    placeholder: "상품명을 입력해주세요",
                    name: "name",
                    value: "",
                    maxLength: 40,
                    onChange: () => { },
                }} />
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