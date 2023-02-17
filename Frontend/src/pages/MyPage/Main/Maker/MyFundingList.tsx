import { css } from "@emotion/react";
import React from "react";
import MyFundingItem from "./MyFundingItem";
/**
 * 내가 작성한 펀딩 목록들
 */
function MyFundingList() {
    const itme = [
        {
            id: 1,
            title: "펀딩 제목",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQqT18Hak_4HP9MnJmEQG3D0tQX1ttFzVNQ&usqp=CAU",
            state: "펀딩 상태",
            isDeleteAble: false
        },
        {
            id: 2,
            title: "펀딩 제목",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQqT18Hak_4HP9MnJmEQG3D0tQX1ttFzVNQ&usqp=CAU",
            state: "펀딩 상태",
            isDeleteAble: false
        },
        {
            id: 3,
            title: "펀딩 제목",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQqT18Hak_4HP9MnJmEQG3D0tQX1ttFzVNQ&usqp=CAU",
            state: "펀딩 상태",
            isDeleteAble: false
        },
        {
            id: 4,
            title: "펀딩 제목",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQqT18Hak_4HP9MnJmEQG3D0tQX1ttFzVNQ&usqp=CAU",
            state: "펀딩 상태",
            isDeleteAble: false
        },
        {
            id: 5,
            title: "펀딩 제목",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQqT18Hak_4HP9MnJmEQG3D0tQX1ttFzVNQ&usqp=CAU",
            state: "펀딩 상태",
            isDeleteAble: false
        },
        {
            id: 6,
            title: "펀딩 제목",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQqT18Hak_4HP9MnJmEQG3D0tQX1ttFzVNQ&usqp=CAU",
            state: "펀딩 상태",
            isDeleteAble: false
        },
    ];
    return (
        <ul
            css={style}
        >
            {itme.map((item) => (
                <MyFundingItem
                    key={item.id}
                    {...item}
                />
            ))}


        </ul>
    );
}

const style = css`
    display: inline-flex;
    list-style-position: inside;
    overflow-x: scroll;
    width: 100%;
    margin-top: 1rem;
    li {
        min-width: 20%;
        margin-right: 0.5rem;
        height: auto;
    }

    @media screen and (max-width: 1095px) {
        scrollbar-width: none;
        
    }
`;

export default MyFundingList;