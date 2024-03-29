import React, { useCallback } from "react";
import BaseProps from "@/types/BaseProps";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";

interface ButtonControllerProps {
    nextButtonValue?: string;
    step: number;
    path: string;
    lastStep: number;
    onClick?: () => void;
}

function ButtonController(props: BaseProps & ButtonControllerProps) {
    const { step, path, nextButtonValue, lastStep } = props;
    const navigator = useNavigate();
    const goNextStepHandler = useCallback(() => {
        if (lastStep > step)
            navigator(`${path}${step + 1}`);
        console.log("aa");
        props?.onClick?.();
    }, [lastStep, navigator, path, props, step]);

    const prevStepHandler = useCallback(() => {
        if (step !== 1)
            navigator(`${path}${step - 1}`);
    }, [navigator, path, step]);


    return (
        <article
            className={props?.className}
        >
            {step !== 1 &&
                <Button
                    className="prev"
                    onClick={prevStepHandler}
                    value="< 이전"
                />
            }
            <Button
                className="next"
                onClick={goNextStepHandler}
                value={nextButtonValue ?? ""}
            />

        </article>
    );
}

export default ButtonController;