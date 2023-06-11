import InfinityScroll from "@/components/common/InfinityScroll";
import UserFundingItem from "@/components/common/UserFunding/UserFundingItem";
import UserFundingList from "@/components/common/UserFunding/UserFundingList";
import useUserInfoContext from "@/hooks/useUserInfoContext";
import React from "react";

function List() {
    const { list } = useUserInfoContext();
    console.log(list.fundingList);
    return (
        <InfinityScroll
            hasNextPage={list.hasNextPage}
            fetchNextPage={list.fetchNextPage}
            isFetchingNextPage={list.isFetchingNextPage}
        >
            <UserFundingList>
                {
                    list.fundingList?.map((item) => (
                        <UserFundingItem
                            key={item.id}
                            title={item.title}
                            imgSrc={item.image}
                            alt={item.id.toString()}
                            url={`/project/make?project=${item.id}`}
                            state={item.state}
                            underText={"상세 정보"}
                        />
                    ))
                }
            </UserFundingList>
        </InfinityScroll>

    );
}

export default List;