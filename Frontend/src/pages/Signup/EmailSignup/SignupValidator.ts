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
        if(!UserInfoValidator.isEmail(value)) {
            if(UserInfoValidator.isShortEmail(value)) {
                setErrors({
                    ...errors,
                    email: "최소 2자이상 입력해주세요"
                });
            }
            else {
                setErrors({
                    ...errors,
                    email: "올바른 이메일 형식이 아닙니다"
                });
            }
        } else {
            setErrors({
                ...errors,
                email: false
            });
        }
        break;
    }
    case "name":
    {
        if(!UserInfoValidator.isName(value)) {
            if(UserInfoValidator.isShortName(value)){
                setErrors({
                    ...errors,
                    name: "최소 2자이상 입력해주세요"
                });
                return;
            }
            else if(UserInfoValidator.isLongName(value)) {
                setErrors({
                    ...errors,
                    name: "최대 10자이하 입력해주세요"
                });
            }
            else {
                setErrors({
                    ...errors,
                    name: "올바른 이름 형식이 아닙니다"
                });
            }
        } else {
            setErrors({
                ...errors,
                name: false
            });
        }
        break;
    }
    case "password": {
        if(!UserInfoValidator.isPassWord(value)) {
            if(UserInfoValidator.isShortPassword(value)) {
                setErrors({
                    ...errors,
                    password: "최소 8자이상 입력해주세요"
                });
            }
            else if(UserInfoValidator.isLongPassword(value)) {
                setErrors({
                    ...errors,
                    password: "최대 25자이하 입력해주세요"
                });
            }
            else if(!UserInfoValidator.isSpecialCharacter(value)) {
                setErrors({
                    ...errors,
                    password: "반드시 특수문자를 포함해주세요"
                });
            }
            else if(!UserInfoValidator.isNumberCharacter(value)) {
                setErrors({
                    ...errors,
                    password: "반드시 숫자를 포함해주세요"
                });
            }
            else if(!UserInfoValidator.isAlphabetCharacter(value)) {
                setErrors({
                    ...errors,
                    password: "반드시 영문을 포함해주세요"
                });
            }
            else {
                setErrors({
                    ...errors,
                    password: "올바르지 않는 비밀번호 형식입니다."
                });
            }
        }
        else {
            setErrors({
                ...errors,
                password: false
            });
        }
    }
    }

}

export default SignupValidator;