import Button from "@/components/common/Button";
import useUserInfoContext from "@/hooks/useUserInfoContext";
import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import ListModal from "./Modal/ListModal";
import useShown from "@/hooks/useShown";
import RelationButton from "./RelacionButton";
import { useParams } from "react-router-dom";

/**
 * 특정 유저 정보 디테일
 * @returns 
 */
function UserInfoDetail() {
    const [modalTitle, setModalTitle] = useState<string>("");
    const { userInfo } = useUserInfoContext();
    const { nickname, fundingCount, followerCount, followingCount, isFollowing, onFollow, onUnfollow }
        = userInfo;

    const { isShowing, onClose, onOpen } = useShown(true);
    const { userId } = useParams<{ userId: string }>();

    const onClickBtn = () => {
        if (isFollowing) {
            onUnfollow(Number(userId));
        } else {
            onFollow(Number(userId));
        }
    };

    const onClickList = useCallback((name: string) => {
        setModalTitle(name);
        onOpen();
    }, [onOpen]);

    console.log(isShowing);
    return (
        <section css={style}>
            {isShowing && <ListModal title={modalTitle} isShowing={isShowing} onClose={onClose} />}
            <div className="top">
                <h2>{`${nickname}`}</h2>
                <RelationButton
                    isRelation={isFollowing ?? false}
                    onClick={onClickBtn}
                />
                <Button
                    className={`event-btn ${isFollowing ? "follow-active" : "follow-inactive"}`}
                    value={""}
                    onClick={onClickBtn}
                />
            </div>

            <ul>
                <li>
                    <p>{`펀딩`}</p>
                    <span className="count">{fundingCount}</span>
                </li>
                <li onClick={() => onClickList("팔로잉")}>
                    <p>{`팔로잉`}</p>
                    <span className="count">{followingCount}</span>
                </li>
                <li onClick={() => onClickList("팔로우")}>
                    <p>{`팔로우`}</p>
                    <span className="count">{followerCount}</span>
                </li>
            </ul>
        </section>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    h2 {
        font-size: 1.6rem;
    }

    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    
    & > ul {
        display: inline-flex;
        color: var(--grey-500);
    }

    & > ul >  li  {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }

    & > ul >  li:nth-child(1) {
        padding-left: 0;
    }

    .count {
        font-weight: 600;
        margin-left: 0.3rem;
    }
    


    @media screen and (min-width: 1096px) {

    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        .top {
            margin-top: 0.3rem;
            justify-content: center;
            flex-direction: column;            
        }
        ul {
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid var(--grey-200);
            margin-top: 1rem;
        }

        ul > li {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

export default UserInfoDetail;