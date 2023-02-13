import ProjectMakeProductsContextProps from "@/types/ProjectMakeProductsContextProps";
import { createContext } from "react";
import React from "react";
/**
 * 프로젝트 생성 상품 관리 Context API
 */
const ProjectMakeProductsContext = createContext<ProjectMakeProductsContextProps>({
    isEditMode: false,
    products: [],
    onAddProduct: () => {},
    onDeleteProduct: () => {},
    onResetProduct: () => {},
    onLoadProduct: () => {},
    onOffEditMode: () => {},
    onEditProduct: () => {},
    product: {
        values: {
            description: "",
            price: 0,
            shippingPrice: -1,
            shippingDay: "",
            inventory: 0,
            name: "",
        },
        onChangeValues: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {},
    }
});

export default ProjectMakeProductsContext;

