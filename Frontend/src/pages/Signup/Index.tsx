import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Success from "./Success";

function Index() {
    return (
        <Routes>
            <Route path="/success" element={<Success />} />
            <Route path="/" element={<Signup />} />
        </Routes>
    );
}

export default Index;