import { css } from "@emotion/react";
import * as React from "react";

function Logo() {
    return (
        <div css={style}>
            Withding
        </div>
    );
}

const style = css`
    font-weight: 800;
`;

export default Logo;