import { css } from "@emotion/react";
import React from "react";
import KakakoLoginButton from "./KakakoLoginButton";

function OauthLoginButtons() {
    return (
        <div
            className="oauth-buttons"
            css={style}
        >
            <KakakoLoginButton />
        </div>
    );
}

const style = css`
`;

export default OauthLoginButtons;