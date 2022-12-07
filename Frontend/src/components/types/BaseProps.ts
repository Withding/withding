import React from "react";

interface BaseProps {
    css?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export default BaseProps;