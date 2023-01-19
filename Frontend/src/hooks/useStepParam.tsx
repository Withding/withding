import React from "react";
import { useLocation } from "react-router-dom";

function useStepParam(): number {
    const { search } = useLocation();
    const step = parseInt(new URLSearchParams(search).get("step") ?? "1");
    return step;
}

export default useStepParam;