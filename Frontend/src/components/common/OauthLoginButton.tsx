import styled from "@emotion/styled";
import React from "react";

interface OauthLoginButtonProps {
    text: string;
    logo?: React.ReactChild;
    backgroundColor: string;
    fontColor: string;
    onClick?: () => void;
}

function OauthLoginButton(props: OauthLoginButtonProps) {
    return (
        <Button
            backgroundColor={props.backgroundColor}
            fontColor={props.fontColor}
            className="login-button"
            onClick={props.onClick}
        >

            <span>
                {props.logo}
                <a>{props.text}</a>
            </span>
        </Button>
    );
}

const Button = styled.div<{ backgroundColor: string; fontColor: string; }>`
    margin-top: 0.5rem;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.75;
    font-weight: 500;
    color: ${props => props.fontColor};
    background-color: ${props => props.backgroundColor};
    border-radius: 6px;
    a {
        font-size: 1.1rem;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        position: absolute;
        left: 0;
        font-size: 1.3rem;
        margin-right: 0.5rem;
        margin-left: 1rem;
        
    }
`;

export default React.memo(OauthLoginButton);