/* eslint-disable indent */
import React from "react";
import Funding from "@/types/UserFunding";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import LazyImage from "@/components/common/LazyImage";


const getStateColor = (state: string) => {
    let color = "";
    switch (state) {
        case "진행대기": {
            color = "var(--blue-300)";
            break;
        }
        case "진행중": {
            color = "var(--green-300)";
            break;
        }
        case "종료": {
            color = "var(--red-300)";
            break;
        }
        case "정지": {
            color = "var(--deepgrey)";
            break;
        }
        case "임시저장": {
            color = "var(--orange)";
            break;
        }
    }

    return color;
};
function TextArea(props: Funding) {
    const title = props.title.length === 0 ? "제목을 입력해주세요." : props.title;

    return (
        <section css={textAreaStyle}>
            <h3>{title}</h3>
            <State
                color={getStateColor(props.state)}
            >
                {props.state}
            </State>
        </section>
    );
}

function MyFundingItem(props: Funding) {
    const navigator = useNavigate();
    return (
        <li css={style}>
            <LazyImage
                src={props.image}
                alt={props.id.toString()}
                className="img"
                objectFit="cover"
            />
            <TextArea
                {...props}
            />
            <section
                className="go-studio"
                onClick={() => navigator(`/project/make?project=${props.id}`)}
            >
                <p> {"스튜디오 바로가기"}</p>
            </section>
        </li>
    );
}

const style = css`
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--grey-200);
    width: 100%;
    min-height: 23rem;

    & > .img {
            width: 100%;
    }


    .go-studio {
        width: 100%;
        cursor: pointer;
        border-top: 1px solid var(--grey-200);
        text-align: center;
        display: block;
        padding: 1.5rem 0 1.5rem 0;
        p {
            color: var(--grey-500);
            font-weight: 200;
        }
    }
    @media screen and (min-width: 1096px) {
        & > .img {
            min-height: 15rem;
            max-height: 15rem;
        }
    }

    @media screen and (max-width: 1095px) {
        & > .img {
            min-height: 12rem;
            max-height: 12rem;
        }
    }
    
`;

const State = styled.span<{ color: string }>`
    margin-top: 1rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    &::before{
        content: '';
        display: inline-block;
        width: 7px;
        height: 7px;
        margin-right: 0.3rem;
        /* -moz-border-radius: 7.5px;
        -webkit-border-radius: 7.5px; */
        border-radius: 7.5px;
        background-color: ${prop => prop.color};
    }
`;

const textAreaStyle = css`
    padding: 1rem;
    height: 100%;
    & > h3 {
        color: var(--black);
        font-weight: 600;
        font-size: 1.2rem;
    }
    border-top: 1px solid var(--grey-200);
    color: var(--grey-300);
`;


export default MyFundingItem;