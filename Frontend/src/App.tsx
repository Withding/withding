import { css } from "@emotion/react";
import * as React from "react";
import Header from "./components/header/Header";
import GlobalStyle from "./GlobalStyle";
function App() {
    return (
        <div
            className="container"
            css={defaultStyle}
        >
            <GlobalStyle />
            <Header />



        </div>
    );
}

const defaultStyle = css`
    width: 100%;
    min-height: 100vh;
`;

export default App;