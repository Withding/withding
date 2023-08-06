import Button from "@/components/common/Button";
import { css } from "@emotion/react";
import React from "react";

function UserRelactionItem(props: {
    name: string;
    img: string;
    relation: boolean;
}) {
    return (
        <li css={style}>
            <img src={props.img} alt={props.name} />
            <p>{props.name}</p>
            <Button
                className={`event-btn ${props.relation} ? "follow-active" : "follow-inactive"}`}
                value={"ㅇㅇㅇ"}
                onClick={() => { }}
            />
        </li>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    
    p {
        min-width: 60%;
    }

    img {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
    }
`;

export default UserRelactionItem;