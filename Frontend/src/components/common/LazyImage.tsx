import BaseProps from "@/types/BaseProps";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";


interface LazyImageProps {
    src: string;
    alt?: string;
    objectFit: string;
}

/**
 * 이미지 Lazy Loading 처리를 위한 컴포넌트
 * @ src - 이미지 src 속성
 * @ alt - 이미지 alt 속성
 * @ objectFit - object-fit 속성
 * @returns 
 */
function LazyImage(props: BaseProps & LazyImageProps) {
    const [isShown, setIsShown] = useState<boolean>(false);
    // 실제 화면에 보여지고 있는지 여부를 확인
    const divRef = useRef<HTMLDivElement>(null);
    // div 태그 요소
    const observer = useRef<IntersectionObserver>();
    // IntersectionObserver 변수

    // IntersectionObserver Callback
    const intersectionObserverCallback =
        useCallback((entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { // 관찰되고 있는 entry가 보여지게 된 다면
                    io.unobserve(entry.target); // 관찰 종료
                    setIsShown(true); // 로딩 체크
                    console.log("보임");
                }
            });
        }, []);

    useEffect(() => {
        observer.current =
            new IntersectionObserver(intersectionObserverCallback, {
                root: null, // 루트 요소를 지정하지 않으면 브라우저의 뷰포트
                rootMargin: "0px", // 루트 요소의 margin값
                threshold: 0, // 관찰 대상이 루트 요소와 얼마나 겹쳐져 있는지를 나타내는 값
            });
        divRef.current && observer.current.observe(divRef.current); // div 태그 관찰 시작
    }, [intersectionObserverCallback]);

    return (
        <Figure
            css={props?.css}
            className={props?.className}
            objectFit={props?.objectFit}
            ref={divRef}
        >
            {
                isShown ?
                    <img src={props.src} alt={props?.alt} />
                    :
                    <div className="dummy"></div>
            }

        </Figure>
    );
}

const Figure = styled.figure <{ objectFit: string }>`
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .dummy {
        width: 100%;
        height: 100%;
        background-color: var(--black);
    }
`;
export default LazyImage;