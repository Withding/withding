import MyPageSupport from "@/types/MyPageSupport";
import React from "react";

const SupportContext = React.createContext<MyPageSupport>({
    fundingCount: 0,
    profileImage: "",
    point: 0,
    nickName: ""
});

export default SupportContext;