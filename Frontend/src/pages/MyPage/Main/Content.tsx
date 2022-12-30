import { css } from "@emotion/react";
import React, { useContext } from "react";
import BaseProps from "@/types/BaseProps";
import MyPageMainContext from "@/store/MyPageMainContext";
import SupportContext from "./Support/SupportContext";
import MakerContext from "./Maker/MakerContext";

/**
 * Menu Content
 * @returns 
 */
function Content(props: BaseProps) {
    const { currentMenu } = useContext(MyPageMainContext);
    const contexts: React.ReactNode[] = [
        <SupportContext key={1} />, <MakerContext key={2} />
    ];
    return (
        <div css={style} className={props.className}>
            {contexts[currentMenu]}
        </div>
    );
}

const style = css`
    background: white;
    display: flex;
    @media screen and (min-width: 1096px) {
        max-width: 1025px;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 3rem;
        flex-direction: row;
    }

    @media screen and (max-width: 1095px) {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 2rem;
        flex-direction: column;
    }
`;

export default Content;