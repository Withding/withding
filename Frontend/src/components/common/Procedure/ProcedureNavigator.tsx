import React, { useCallback, useMemo, useState } from "react";
import BaseProps from "@/types/BaseProps";
import { css } from "@emotion/react";
import EpisodeType from "@/types/EpisodeType";
import ProcedureNavigatorItem from "./ProcedureNavigatorItem";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";

interface ProcedureNavigatorProps {
    list: EpisodeType[];
    path: string;
    currnet: number;
}


/**
 * ProcedureNavigator 컴포넌트  ( 메뉴 )
 * @param props.list EpisodeType[] 에피소드 리스트
 * @returns 
 */
function ProcedureNavigator(props: ProcedureNavigatorProps & BaseProps) {
    const isMobile = useMediaQuery({ query: "(max-width: 1095px)" });
    const [isShown, setIsShown] = useState<boolean>(false);

    const isShownMenuButton = useMemo(() => !isShown && isMobile, [isMobile, isShown]);
    const isShownCloseButton = useMemo(() => isShown && isMobile, [isMobile, isShown]);
    const isShowList = useCallback(() => {
        if (!isMobile)
            return true;
        if (isMobile && isShown)
            return true;
        else
            return false;
    }, [isMobile, isShown]);

    const openMenuHandler = useCallback(() => {
        setIsShown(() => true);
    }, []);

    const closeMenuHandler = useCallback(() => {
        setIsShown(() => false);
    }, []);
    return (
        <aside
            className={props?.className}
            css={style}
        >
            {isShownMenuButton && <AiOutlineMenu className="menu" onClick={openMenuHandler} />}
            {isShownCloseButton && <AiOutlineClose className="close" onClick={closeMenuHandler} />}
            {
                isShowList() &&
                <ul>
                    {props.list.map((episode) => (
                        <ProcedureNavigatorItem
                            key={episode.step}
                            {...episode}
                            path={props.path}
                            isSelected={episode.step === props.currnet}
                        />
                    ))}
                </ul>
            }
        </aside>
    );
}

const style = css`
    
    min-height: 100vh;
    border-right: 1px soild var(--grey-100);
    padding: 2rem;
    ul {
        display: flex;
        flex-direction: column;
        /* padding: 1rem; */
        background-color: white;
    }

    svg {
        cursor: pointer;
    }
    @media screen and (min-width: 1096px){

        .svg {
            display: none;
        }
    }
    @media screen and (max-width: 1095px) {
        position: absolute;
        ul {
            width: 16rem;
            min-height: 100vh;
            position: absolute;
            z-index: 3;
        }
    }
`;

export default ProcedureNavigator;