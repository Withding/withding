import React from "react";
import Notice from "../Notice/Notice";
import Search from "../Search/Search";

function MainHeader() {
    return (
        <React.Fragment>
            <Search />
            <Notice />
        </React.Fragment>
    );
}

export default MainHeader;