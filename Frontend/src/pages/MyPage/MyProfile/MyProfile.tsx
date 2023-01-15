import { css } from "@emotion/react";
import React from "react";
import EditProfileImage from "./EditProfileImage";

/**
 * 마이 프로필 수정 페이지 컴포넌트
 * 
 * @returns 
 */
function MyProfile() {
    return (
        <article css={style}>
            <div className="content">
                <h1>프로필 정보 설정</h1>
                <EditProfileImage />
            </div>

        </article>
    );
}

const style = css`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--grey-100);

    .content {
        margin-top: 1rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        max-width: 400px;
        min-width: 400px;

        color: var(--grey-500);
        h1 {
            font-weight: 400;
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
    }
`;

export default MyProfile;