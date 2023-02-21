import React, { useMemo } from "react";
import LabelInput from "@/components/common/LabelInput";
import InputProps from "@/types/InputProps";
import { css } from "@emotion/react";
import BaseProps from "@/types/BaseProps";

/**
 * 제한된 글자를 입력하는 컴포넌트
 * @returns 
 */
function LimitTextInput(props: {
    label: string;
    input?: InputProps;
    onChangeValue?: (e: any) => void;
} & BaseProps) {
    const MAX_LENGTH = useMemo(() => props.input?.maxLength ?? 0, [props.input?.maxLength]);
    return (
        <section
            className={props?.className}
            css={style}
        >
            <LabelInput
                label={props.label}
                input={{ ...props.input, onChange: props.onChangeValue }}
            />
            <span className="sub-description">{`${MAX_LENGTH - props.input!.value!.length}자 남음`}</span>
        </section>
    );
}

const style = css`
    width: 100%;
    margin-bottom: 2rem;
`;

export default LimitTextInput;