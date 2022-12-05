import * as React from "react";
import styled from "@emotion/styled";
import "./default.css";
import { css } from "@emotion/react";
function App() {
    return (
        <div className="aa"
            css={style}
        >
            <P>WA</P>
        </div>
    );
}

const style = css`
    padding: 1rem;
    background-color: #eee;
`;

const P = styled.div`
    font-size: 2rem;
`;

export default App;