import { css } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";

function PrevViewImageWrapper({ image, onRemove }:
    { image?: string, onRemove: () => void }
) {
    return (
        <div css={prevViewImageStyle}>
            <img src={image} alt={"대표 이미지"} />
            <AiOutlineClose onClick={onRemove} />
        </div>
    );
}
/**
 * 프로젝트 대표 이미지 선택 컴포넌트
 * @returns 
 */
function BestImage(props: {
    value: string | null | undefined;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    onDeleteThumbnail: () => void;
}) {
    const imageRef = useRef<HTMLInputElement>(null);
    const [preViewImage, setPreViewImage] = useState<string | null>(null);
    const registerImageButtonClickHandler = useCallback(() => {
        imageRef.current?.click();
    }, []);

    useEffect(() => {
        setPreViewImage(props.value || null);
    }, [props.value]);

    const onChangeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        const file = files[0];
        const blob = new Blob([file], { type: file.type });
        setPreViewImage(() => window.URL.createObjectURL(blob));
        props.onChangeValue(e);
    }, [props]);

    const removePrevViewImageHandler = useCallback(() => {
        props.onDeleteThumbnail();
        setPreViewImage(null);
    }, [props]);

    return (
        <section css={style}>
            <label>
                <span>대표 이미지</span>
            </label>
            <span className="sub-description">
                {"작은 이미지를 넣게되면 이미지가 이상하게 보일수도 있습니다."}
            </span>
            {
                preViewImage ?
                    <PrevViewImageWrapper
                        image={preViewImage.toString()}
                        onRemove={removePrevViewImageHandler}
                    />
                    :
                    <React.Fragment>
                        <input
                            type="file"
                            name="bestImage"
                            ref={imageRef}
                            onChange={onChangeImage}
                            accept="image/png, image/jpeg"
                            hidden />
                        <button type="button" onClick={registerImageButtonClickHandler}>
                            <AiOutlineCamera /><p>{"등록하기"}</p>
                        </button>
                    </React.Fragment>
            }
        </section >
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    span.sub-description {
        margin: 1rem 0 0.5rem 0;
    }
    button {
        width: 9rem;
        background-color: var(--grey-500);
        color: var(--white);
        border-radius: 6px;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    button:hover {
        background-color: var(--grey-400);
    }

    button > svg {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }
`;

const prevViewImageStyle = css`
    width: 100%;
    display: inline-flex;
    img {
        width: 100%;
        height: auto;
        object-fit: fill;
    }
    svg {
        margin-left: 1rem;
        cursor: pointer;
    }
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid var(--grey-300);

    @media screen and (min-width: 1096px) {
        max-width: 600px;
        max-height: 300px;
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
    }

`;
export default BestImage;