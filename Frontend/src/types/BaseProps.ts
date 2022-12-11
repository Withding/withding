import React from "react";
import { SerializedStyles } from "@emotion/react";

interface BaseProps {
    css?: SerializedStyles
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export default BaseProps;