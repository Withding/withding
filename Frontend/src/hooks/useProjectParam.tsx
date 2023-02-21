import React from "react";
import { useLocation } from "react-router-dom";

function useProjectParam() {
    const { search } = useLocation();
    const step = parseInt(new URLSearchParams(search).get("project") ?? "0");
    return step;
}

export default useProjectParam;