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
        const event = (e: React.KeyboardEvent | KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose();
            }
        };

        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
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
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(1px);
    z-index: 3;
`;

export default Modal;