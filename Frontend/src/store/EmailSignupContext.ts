import  React from "react";
import EmailSignupContextProps from "../types/EmailSignupContextProps";

const EmailSignupContext = React.createContext<EmailSignupContextProps>({
    values: {
        email: "",
        authCode: "",
        name: "",
        password: "",
        password2: ""
    },
    onChangeValues: () => {},
    isSuccessSendMail: false,
    onSendMail: () => {},
    onSubmit: () => {},
    errors: {
        email: false,
        authCode: false,
        name: false,
        password: false,
        password2: false,
    },

    requestCodeIsLoading: false,
    onCheckAuthCode: () => {} ,

    invalidAuthCode: false,
    validAuthCode: false,
});

export default EmailSignupContext;