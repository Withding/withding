import { useState } from "react";

function useShown(defaultValue = false) {
    const [isShowing, setIsShowing] = useState(defaultValue);
    const onToggle = () => setIsShowing(!isShowing);
    return { isShowing, onToggle };
}

export default useShown;
