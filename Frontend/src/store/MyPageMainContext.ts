import React from "react";

const MyPageMainContext = React.createContext<any>({
    currentMenu: 0,
    setCurrentMenu: (id: number) => {},
});

export default MyPageMainContext;