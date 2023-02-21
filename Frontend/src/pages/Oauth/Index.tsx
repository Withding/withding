import React from "react";
import { Route, Routes } from "react-router-dom";
import Kakao from "./Kakao";

function Index() {
    console.log("aa");
    return (
        <React.Fragment>
            <h1>
                로그인중
            </h1>
            <Routes>
                <Route path="kakao" element={<Kakao />} />
            </Routes>
        </React.Fragment>

    );
}

export default Index;   