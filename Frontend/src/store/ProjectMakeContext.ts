import React from "react";
import ProjectMakeContextProps from "@/types/ProjectMakeContextProps";
import ProjectMakeValues from "@/types/ProjectMakeValues";

const ProjectMakeContext = React.createContext<ProjectMakeContextProps>({
    project: -1,
    values: {
        title: "",
        category: -1,
        targetAmount: 0,
        startDate: "",
        endDate: "",
        content: "",
        preViewImage: null,
    },
    onChangeValue: () => {},
    onChangeContent: () => {},
    onChangeStep1Values: (values: ProjectMakeValues) => {},
    onDeleteThumbnail: () => {},
    product: {
        values: {
            description: "",
            price: 0,
            shippingPrice: -1,
            shippingDay: "",
            inventory: 0,
            name: "",
            image: null
        },
        onChangeValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {},
        addProduct: () => {},
    }
});

export default ProjectMakeContext;