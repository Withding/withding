import { css } from "@emotion/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";



const Backdrop = (props:
    {
        children: React.ReactNode;
        isShowing: boolean;
        onClose: () => void;
    }
) => {

    useEffect(() => {
        const event = (e: React.KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose();
            }
        };
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose();
            }
        });
    }, [props]);
    if (props.isShowing) {
        return (
            <div css={backdropStyle}
                onClick={props.onClose}
            >
                {props.children}
            </div >
        );
    }
    else {
        return <></>;
    }
};

function Modal(props:
    {
        children?: React.ReactNode;
        isShowing: boolean;
        onClose: () => void;
    }
) {
    const portalElement = document.getElementById("overlay") as HTMLElement;
    return (
        ReactDOM.createPortal(
            <Backdrop
                {...props}
            >
                {props.children}
            </Backdrop>
            , portalElement
        ));
}

const backdropStyle = css`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(1px);
    z-index: 999;
`;

export default Modal;