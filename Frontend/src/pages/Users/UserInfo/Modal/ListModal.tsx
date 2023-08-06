import Modal from "@/components/common/Modal";
import UserFollowListResponse from "@/types/UserFollowListResponse";
import fetchUserFollowList from "@/utils/RequestApis/users/fetchUserFollowList";
import { css } from "@emotion/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import FollowList from "./FollowList";

function ListModal(props:
    {
        isShowing: boolean;
        onClose: () => void;
        title: string;
    }
) {
    // 해당 유저 팔로우 리스트
    const isFollowList = props.title === "팔로우";
    return (
        <Modal
            {...props}
        >
            <section
                css={style}
                onClick={(e) => e.stopPropagation()}
            >
                <header>
                    <h3>{props.title}</h3>
                    <AiOutlineClose
                        onClick={props.onClose}
                        className="close"
                    />
                </header>

                <main>
                    {isFollowList ?
                        <FollowList />
                        :
                        <>123</>
                    }
                </main>
            </section>
        </Modal>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 25rem;
    height: 25rem;
    background-color: white;
    border-radius: 5px;

    header {
        position: relative;
        padding: 1rem;
        border-bottom: 1px solid var(--grey-300);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 1.2rem;
        min-height: 3.5rem;
        max-height: 3.5rem;
    }

    header > .close { 
        position: absolute;
        right: 1rem;
        cursor: pointer;
    }
`;

export default ListModal;