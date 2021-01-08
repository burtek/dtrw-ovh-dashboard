import { useState, useCallback } from "react";

export function useBoolean(initial = false) {
    const [state, setState] = useState(initial);
    const setTrue = useCallback(() => setState(true), [setState]);
    const setFalse = useCallback(() => setState(false), [setState]);

    return [state, setTrue, setFalse] as const;
}