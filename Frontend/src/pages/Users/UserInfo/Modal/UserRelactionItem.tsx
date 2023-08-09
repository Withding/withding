import { css } from "@emotion/react";
import React from "react";
import RelationButton from "../RelacionButton";

function UserRelactionItem(props: {
    name: string;
    img: string;
    relation: boolean;
}) {
    return (
        <li css={style}>
            <img src={props.img} alt={props.name} />
            <p>{props.name}</p>
            <RelationButton
                isRelation={props.relation}
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

    button {
        max-width: 8rem;
    }
`;

export default UserRelactionItem;