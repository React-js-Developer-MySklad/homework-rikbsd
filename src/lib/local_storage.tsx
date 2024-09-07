import {useEffect, useState} from "react";

export function getStorageValue(key: string, defaultValue: any) {
    // getting stored value
    const saved = localStorage.getItem(key);

    try {
        const initial = JSON.parse(saved);

        return initial || defaultValue;
    } catch (ignore) {
        // console.log('except');
    }

    return defaultValue;
}


export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
