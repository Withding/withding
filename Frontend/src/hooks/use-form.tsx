import React, { useCallback, useState } from "react";

interface useFormProps {
    initValues: {
        [key: string]: string;
    }
    validator: any;
}
function useForm(props: useFormProps) {
    const [values, setValues] = useState(props.initValues);
    const [errors, setErrors] = useState<{ [key in string]: boolean }>({});

    const onChangevalues = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        await props.validator({ name: name, value: value, error: errors, setErrors: setErrors });
    }, [errors, props, values]);

    return {
        values,
        onChangeValues: onChangevalues,
        errors
    };
}

export default useForm;