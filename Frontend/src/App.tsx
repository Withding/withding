import { css } from "@emotion/react";
import * as React from "react";
import Header from "./components/header/Header";
import GlobalStyle from "./GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "./pages/Main/Index";

function App() {
    return (
        <div
            className="container"
            css={defaultStyle}
        >
            <GlobalStyle />
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="/main" />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/login" element={<div>login</div>} />
                    <Route path="/funding" element={<div>funding</div>} />
                    <Route path="/commingsoon" element={<div>commingsoon</div>} />
                </Routes>
            </div>
        </div>
    );
}

const defaultStyle = css`
    width: 100%;
    min-height: 100vh;

    @media screen and (max-width: 1095px) {
        & > .content {
            padding-top: 4rem;
        }
    }
`;

export default App;