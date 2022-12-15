import UserInfoValidator from "../../../utils/Validator/UserInfoValidator";


interface SignupValidatorProps {
    name: string;
    value: string;
    errors: {
        [key: string]: boolean;
    }
    setErrors: (e: any) => void;
}

function isEmail(email: string) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

function SignupValidator({ name, value, errors, setErrors }: SignupValidatorProps){
    switch(name) {
    case "email":
        {
            if(!isEmail(value)) {
                setErrors({
                    ...errors,
                    email: true
                });
            } else {
                setErrors({
                    ...errors,
                    email: false
                });
            }
        }
        break;
    }

}

export default SignupValidator;