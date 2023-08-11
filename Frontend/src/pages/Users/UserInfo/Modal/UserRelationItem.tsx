import { css } from "@emotion/react";
import React from "react";
import RelationButton from "../RelacionButton";
import { useMutation, useQueryClient } from "react-query";
import followUser from "@/utils/RequestApis/users/followUser";
import unfollowUser from "@/utils/RequestApis/users/unfollowUser";

function UserRelationItem(props: {
    name: string;
    img: string;
    relation: boolean;
    userId: number;
}) {

    const queryClient = useQueryClient();
    const { mutate: onFollow } = useMutation(
        (userId: number) => followUser(userId),
        {
            onSettled: () => {
                queryClient.invalidateQueries("userFollowList");
            }
        }
    );

    const { mutate: onUnfollow } = useMutation(
        (userId: number) => unfollowUser(userId),
        {
            onSettled: () => {
                queryClient.invalidateQueries("userFollowList");
            }
        }
    );

    const event = () => {
        if (props.relation) {
            onUnfollow(props.userId);
        } else {
            onFollow(props.userId);
        }
    };

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
        max-width: 3em;
        min-width: 3rem;
        text-align: center;
    }
`;

export default UserRelationItem;