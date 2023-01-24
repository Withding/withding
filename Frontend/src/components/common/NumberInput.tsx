import { css } from "@emotion/react";
import React, { useCallback, useMemo, useState } from "react";
import Input from "./Input";
import BaseProps from "@/types/BaseProps";


interface NumberInputProps {
    label: string;
    MAX: number;
    MIN: number;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    input: {
        name: string;
        placeholder: string;
        value: number | string;
    }
    subDescription?: string;
    unit?: string;
}

/**
 * 가격을 입력하는 컴포넌트
 * @returns 
 */
function NumberInput(props: NumberInputProps & BaseProps) {
    const [newAmount, setNewAmount] = useState<string>("");
    const MAX = useMemo(() => props.MAX, [props.MAX]);
    const MIN = useMemo(() => props.MIN, [props.MIN]);
    const [error, setError] = useState(false);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newValue = value.replaceAll(",", "");
        if (!parseInt(value)) {
            return;
        }
        if (parseInt(newValue) > MAX) {
            setNewAmount(() => MAX.toLocaleString("ko-KR"));
            e.target.value = MAX.toString();
            props.onChangeValue(e);
            return;
        }
        if (parseInt(newValue) >= MIN) setError(() => false);
        setNewAmount(() => parseInt(newValue).toLocaleString("ko-KR"));
        e.target.value = newValue;
        props.onChangeValue(e);
    }, [MAX, MIN, props]);


    const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (props.input.value < MIN) {
            setError(() => true);
        } else {
            setError(() => false);
        }
    }, [MIN, props.input.value]);

    return (
        <section css={style} className={props?.className}>
            <label>
                <span>{props.label}</span>
                {props.subDescription &&
                    <span className="sub-description">
                        {props.subDescription}
                    </span>
                }
                <div>
                    <Input
                        className={`${error ? "error" : ""}`}
                        type="text"
                        placeholder={props.input.placeholder}
                        value={newAmount}
                        onChange={onChange}
                        name={props.input.name}
                        onBlur={onBlur}
                    />
                    {props.unit && <span>{props.unit}</span>}

                </div>
            </label>
        </section>
    );
}


const style = css`
    .sub-description {
        margin-top: 1rem;
    }

    div {
        display: inline-flex;
        align-items: center;
        span {
            margin-left: 0.5rem;
        }
    }

    input.error {
        outline: 1px solid #ff0000;
        background-color: #ffebeb;
    }
`;


export default NumberInput;