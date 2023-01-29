import Category from "@/types/Category";
import fetchCategorys from "@/utils/RequestApis/category/fetchCategorys";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import ProjectMakeContext from "@/store/ProjectMakeContext";

/**
 * 프로젝트 카테고리 선택 컴포넌트
 * @returns 
 */
function SelectCategory() {
    const { onChangeValue } = useContext(ProjectMakeContext);
    const { data } = useQuery(["makeCategory"], () => fetchCategorys(), {
        suspense: false,
        useErrorBoundary: false
    });

    return (
        <section>
            <label>
                <span>카테고리</span>
                <select
                    css={style}
                    onChange={onChangeValue}
                    name="category"
                >
                    <option selected value="-1">카테고리</option>
                    {data?.categoryList.map((item: Category) => (
                        <option key={item.id} value={item.id}>{item.category}</option>
                    ))}
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
    display: flex;
    align-items: center;
`;

export default SelectCategory;