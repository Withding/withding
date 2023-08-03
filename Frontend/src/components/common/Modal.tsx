import { css } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props:
    { children: React.ReactNode; }
) => {
    return (
        <div css={backdropStyle}>
            {props.children}
        </div >
    );
};

function Modal(props:
    { children?: React.ReactNode; }
) {
    const portalElement = document.getElementById("overlay") as HTMLElement;
    return (
        ReactDOM.createPortal(
            <Backdrop>
                {props.children}
            </Backdrop>
            , portalElement
        ));
}

const backdropStyle = css`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
`;

export default Modal;