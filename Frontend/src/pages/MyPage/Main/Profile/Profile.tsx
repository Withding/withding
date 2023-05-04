import { css } from "@emotion/react";
import React, { useContext } from "react";
import Image from "./Image";
import Logout from "../Logout";
import { useMediaQuery } from "react-responsive";
import UserContext from "@/store/UserContext";

interface ProfileProps {
    isEditProfileImage?: boolean;
    type?: number;
    followerCount?: number;
}

/** 
 * ProfileCard 컴포넌트
 * @param props.isEditProfileImage - 프로필 이미지 수정 가능 여부
 * @param props.type - 프로필 타입
 * @returns 
 */
function Profile(props: ProfileProps) {
    const nameDecorator: string[] = [
        "님",
        " 메이커님"
    ];
    const { image, nickName } = useContext(UserContext);
    const isDesktop = useMediaQuery({ query: "(min-width: 1096px)" });
    return (
        <article
            css={articleStyle}
        >
            <section css={style}>
                <Image
                    src={image}
                    isEdit={props.isEditProfileImage}
                />
                <section className="text">
                    <p className="name">
                        <b>{nickName}</b>
                        {nameDecorator[props.type ?? 0]}
                    </p>
                    {props.followerCount !== undefined
                        &&
                        <p className="follower">{`내 팔로워 ${props.followerCount} 명`}</p>
                    }
                </section>
            </section>
            {isDesktop && <Logout className="logout" />}
        </article>
    );
}

const articleStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const style = css`
    display: flex;
    flex-direction: column;
    .text {
        .name {
            font-size: 1.2rem;
            font-weight: 200;
        }

        b {
            font-weight: 500;
        }

        .follower {
            font-size: 0.8rem;
        }
    }
    @media screen and (min-width: 1096px) {
        width: 233px;
        align-items: center;
        flex-direction: column;
        .text {
            margin-top: 1.5rem;
            .follower {
                margin-top: 1rem;
                text-align: center;
            }
        }
        
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        align-items: center;
        flex-direction: row;
        .text {
            width: 100%;
            font-size: 1.2rem;
            margin-left: 1.5rem;
            .follower {
                margin-top: 0.5rem;
            }
        }
    }
`;

export default Profile; 