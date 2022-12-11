import React from "react";

/**
 * 화면 너비 사이즈에 맞춰서 선을 그어주는 컴포넌트
 * @returns 
 */

function DivisionLine() {
    return (
        <hr
            style={{
                width: "100%",
                height: "1px",
                border: "1px solid #f4f5fb",
            }}
        />
    );
}

export default DivisionLine;