import { useState } from "react";

function useShown(defaultValue = false) {
    const [isShowing, setIsShowing] = useState(defaultValue);
    const onClose = () => setIsShowing(() => false);
    const onOpen = () => setIsShowing(() => true);
    return { isShowing, onClose, onOpen };
}

export default useShown;
