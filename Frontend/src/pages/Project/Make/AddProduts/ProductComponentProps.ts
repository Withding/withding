import React from "react";

interface ProductComponentProps {
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default ProductComponentProps;