import { css } from "@emotion/react";
import React, { useCallback, useEffect, useRef } from "react";

interface InfinityScrollListProps {
    children: React.ReactNode;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
}

/**
 * 
 * @param props.children: React.ReactNode
 * @param props.hasNextPage: 다음페이지 존재여부
 * @param props.fetchNextPage: 다음페이지 요청 함수
 * @param props.isFetchingNextPage: 다음페이지 요청중 여부
 * @returns 
 */
function InfinityScroll(props: InfinityScrollListProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();

    // IntersectionObserver Callback
    const intersectionObserverCallback =
        useCallback((entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { // 관찰되고 있는 entry가 보여지게 된 다면
                    if (props.hasNextPage && !props.isFetchingNextPage) {
                        props.fetchNextPage();
                    }
                }
            });
        }, [props]);

    useEffect(() => {
        observer.current =
            new IntersectionObserver(intersectionObserverCallback, {
                root: null, // 루트 요소를 지정하지 않으면 브라우저의 뷰포트
                rootMargin: "0px", // 루트 요소의 margin값
                threshold: 0, // 관찰 대상이 루트 요소와 얼마나 겹쳐져 있는지를 나타내는 값
            });
        targetRef.current && observer.current.observe(targetRef.current); // 관찰 시작
        return () => {
            observer.current && observer.current.disconnect(); // 관찰 종료
        };
    }, [intersectionObserverCallback]);

    return (
        <section
            css={css`
                display: flex;
                flex-direction: column;
            `}
        >
            {props.children}
            {
                props.isFetchingNextPage ?
                    <div>로딩중...</div> :
                    <div
                        className="target"
                        ref={targetRef}
                    >
                    </div>
            }
        </section>
    );
}

export default InfinityScroll;