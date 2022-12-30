import { css } from "@emotion/react";
import React from "react";
import Image from "./Image";

interface ProfileProps {
    profileImage: string;
    isEditProfileImage: boolean;
    nickName: string;
}


/** 
 * ProfileCard 컴포넌트
 * @param props.profileImage - 프로필 이미지
 * @param props.isEditProfileImage - 프로필 이미지 수정 가능 여부
 * @param props.nickNamne - 닉네임
 * @returns 
 */
function Profile(props: ProfileProps) {
    return (
        <section css={style}>
            <Image
                src={props.profileImage}
                isEdit={props.isEditProfileImage}
            />
            <section className="text">
                <p className="name"><b>{props.nickName}</b>님</p>
            </section>
        </section>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 1096px) {
        width: 233px;
        flex-direction: column;
        .text {
            margin-top: 1.5rem;
            .name {
                font-size: 1.2rem;
            }
            b {
                font-weight: 500;
            }
        }
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        flex-direction: ro;
    }
`;

export default Profile;