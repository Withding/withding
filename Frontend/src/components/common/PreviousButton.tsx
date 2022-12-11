import React from "react";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import BaseProps from "../../types/BaseProps";

function PreviousButton(props: BaseProps) {
    const navigator = useNavigate();
    return (
        <GrPrevious
            className={props.className}
            onClick={() => navigator(-1)}
        />
    );
}

export default React.memo(PreviousButton);