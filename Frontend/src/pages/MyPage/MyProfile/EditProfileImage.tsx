import UserContext from "@/store/UserContext";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import SubContent from "./SubContent";


/**
 * 마이페이지 프로필 수정에 사용되는 프로필 이미지 수정 컴포넌트
 * @returns 
 */
function EditProfileImage() {
    const { image } = useContext(UserContext);
    return (
        <SubContent
            title={"프로필 사진"}
        >
            <figure css={figureStyle}>
                <img src={image} alt="profileImage" />
                <div className="event">
                    <button>바꾸기</button>
                    <button>삭제</button>
                </div>
            </figure>
        </SubContent >
    );
}

const figureStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }

    .event {
        margin-top: 2rem;
        button {
            cursor: pointer;
            margin-right: 0.5rem;
            font-weight: 200;
            text-decoration: underline;
            font-size: 0.8rem;
        }
    }
`;

export default EditProfileImage;