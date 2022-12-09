import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./Signin";

function Index() {
    return (
        <Routes>
            <Route path="/" element={<Signin />} />
        </Routes>
    );
}

export default Index;