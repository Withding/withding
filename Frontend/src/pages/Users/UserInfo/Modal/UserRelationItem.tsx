import { css } from "@emotion/react";
import React, { useContext, useState } from "react";
import RelationButton from "../RelacionButton";
import UserInfoContext from "@/store/UserInfoContext";
import { useQueryClient } from "react-query";

function UserRelationItem(props: {
    name: string;
    img: string;
    relation: boolean;
    userId: number;
}) {

    const { userInfo } = useContext(UserInfoContext);
    const { onFollow, onUnfollow } = userInfo;
    const [cliked, setCliked] = useState(false);
    const event = () => {
        if (props.relation) {
            onUnfollow(props.userId);
        } else {
            onFollow(props.userId);
        }
        setCliked(!cliked);
    };
    console.log(props.userId + " " + props.relation);
    return (
        <li css={style}>
            <img src={props.img} alt={props.name} />
            <p>{props.name}</p>
            <RelationButton
                isRelation={props.relation}
                onClick={event}
            />
        </li>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
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

export default UserRelationItem;