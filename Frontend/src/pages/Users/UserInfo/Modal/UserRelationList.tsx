import React from "react";
import UserRelationItem from "./UserRelationItem";

function UserRelationList() {
    return (
        <ul>
            <UserRelationItem
                name="이름"
                img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                relation={true}
            />
        </ul>
    );
}



export default UserRelationList;