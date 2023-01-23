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
    label {
        width: 100%;
        display: flex;
        flex-direction: column;
        span {
            font-size: 1.2rem;
            color: var(--grey-500);
        }
        input {
            margin-top: 0.5rem;
            min-height: 48px;
            padding: 0 1rem;
            font-size: 1rem;
        }
    }

    .sub-description {
        font-size: 0.8rem;
        color: var(--grey-400); 
    }
`;

export default LimitTextInput;