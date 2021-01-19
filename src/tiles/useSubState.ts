import type { Dispatch, SetStateAction } from 'react';

export function useSubState<D extends {}, K extends keyof D>(
    [data, setData]: [D, Dispatch<SetStateAction<D>>],
    key: K
): [D[K], (value: D[K]) => void] {
    return [
        data[key],
        valueOrFn => {
            setData(state => ({
                ...state,
                [key]: valueOrFn instanceof Function ? valueOrFn(state[key]) : valueOrFn
            }));
        }
    ]
}