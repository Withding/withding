import MyPageMainContext from "@/store/MyPageMainContext";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import Content from "./Content";
import Header from "./Header";

/**
 * /mypage/main 컴포넌트
 * @returns 
 */
function Main() {
    const [currentMenu, setCurrentMenu] = React.useState(0);
    const onChangeMenu = useCallback((id: number) => {
        setCurrentMenu(id);
    }, []);
    return (
        <MyPageMainContext.Provider value={{
            currentMenu: currentMenu,
            onChangeMenu: onChangeMenu
        }}>
            <div css={style}>
                <Header />
                <Content className="content" />
            </div>
        </MyPageMainContext.Provider>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content {
        width: 100%;
    }
    
    @media screen and (min-width: 1096px) {
        .menus {
            max-width: 1025px;
        }
    }

    @media screen and (max-width: 1095px) {
        align-items: flex-end;
        .content {
            margin-top: 3rem;
        }
    }
`;

export default Main;