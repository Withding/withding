import { css } from "@emotion/react";
import * as React from "react";
import Header from "./components/header/Header";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <div
            className="container"
            css={defaultStyle}
        >
            <GlobalStyle />
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                </Routes>
            </BrowserRouter>


        </div>
    );
}

const defaultStyle = css`
    width: 100%;
    min-height: 100vh;
`;

export default App;