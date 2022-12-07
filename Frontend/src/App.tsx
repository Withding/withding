import { css } from "@emotion/react";
import * as React from "react";
import Header from "./components/header/Header";
import GlobalStyle from "./GlobalStyle";
import { Routes, Route } from "react-router-dom";
function App() {
    return (
        <div
            className="container"
            css={defaultStyle}
        >
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/funding" element={<div>funding</div>} />
                <Route path="/commingsoon" element={<div>commingsoon</div>} />
            </Routes>


        </div>
    );
}

const defaultStyle = css`
    width: 100%;
    min-height: 100vh;
`;

export default App;