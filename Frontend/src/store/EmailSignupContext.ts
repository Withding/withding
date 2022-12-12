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
    onSubmit: () => {}
});

export default EmailSignupContext;