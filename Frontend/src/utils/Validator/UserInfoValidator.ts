const UserInfoValidator = {
    isShortEmail: (email: string) => {
        return email.length < 2;
    },
    isEmail: (email: string) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    },


    isShortPassword: (password: string) => {
        return password.length < 8;
    },
    isLongPassword: (password: string) => {
        return password.length > 25;
    },
    isSpecialCharacter: (password: string) => {
        return /[!@#$%^*+=-]/.test(password);
    }
    ,
    isNumberCharacter: (password: string) => {
        return /[0-9]/.test(password);
    },
    isAlphabetCharacter: (password: string) => {
        return /[a-zA-Z]/.test(password);
    },
    isPassWord: (password: string) => {
        return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/i.test(password);
    },

    isShortName: (name: string) => {
        return name.length < 2;
    },
    isLongName: (name: string) => {
        return name.length > 10;
    },
    isName: (name: string) => {
        return /^[0-9a-zA-Z가-힣]{2,10}$/i.test(name);
    }   
};

export default UserInfoValidator;