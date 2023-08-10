import React from "react";
import UserRelationItem from "./UserRelationItem";
import { RelationUser } from "@/types/UserRelationList";
import { css } from "@emotion/react";

function UserRelationList(props: { list?: RelationUser[] }) {
    return (
        <ul css={css`
            min-width: 100%;
        `}>
            {
                props.list?.map((user) => (
                    <UserRelationItem
                        key={user.userId}
                        name={user.name}
                        img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        relation={user.relation}
                        userId={user.userId}
                    />
                ))
            }
        </ul>
    );
}



export default UserRelationList;