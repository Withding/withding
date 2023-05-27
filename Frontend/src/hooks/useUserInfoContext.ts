import UserInfoContext from "@/store/UserInfoContext";
import React, { useContext } from "react";

const useUserInfoContext = () => {  
    const context = useContext(UserInfoContext);
    return {
        ...context
    };
};

export default useUserInfoContext;