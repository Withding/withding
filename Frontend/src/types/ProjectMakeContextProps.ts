
import ProjectMakeValues from "./ProjectMakeValues";
import React from "react";
import  Product  from "@/types/Product";

interface ProjectMakeContextProps {
    project: number;
    values: ProjectMakeValues;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeContent: (content: string) => void;
    onChangeStep1Values: (values: ProjectMakeValues) => void;
    product: {
        values: Product;
        onChangeValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
        addProduct: (e: React.FormEvent<HTMLElement>) => void;
    }
}

export default ProjectMakeContextProps;