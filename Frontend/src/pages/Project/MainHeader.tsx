import HorizontalProgressBar from "@/components/common/HorizontalProgressBar";
import React from "react";

interface MainHeaderProps {
    progressBar: {
        now: number;
        max: number;
        height: number;
    }

    leftPage: string;
}

/**
 * /project main 태그 헤더
 * @returns 
 */
function MainHeader(props: MainHeaderProps) {
    const { progressBar, leftPage } = props;
    return (
        <header>
            <HorizontalProgressBar
                now={progressBar.now}
                max={progressBar.max}
                height={progressBar.height}
            />
            <span className="left-page">{`${leftPage}단계 남음`}</span>
        </header>
    );
}

export default MainHeader;