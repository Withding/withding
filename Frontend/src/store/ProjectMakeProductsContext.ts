import ProjectMakeProductsContextProps from "@/types/ProjectMakeProductsContextProps";
import { createContext } from "react";

/**
 * 프로젝트 생성 상품 관리 Context API
 */
const ProjectMakeProductsContext = createContext<ProjectMakeProductsContextProps>({
    products: [],
    onAddProduct: () => {},
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

