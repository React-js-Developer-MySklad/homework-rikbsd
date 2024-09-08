const getStorageValue = function(key, defaultValue) {
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


const setStorageValue = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));

    return value;
}


export {getStorageValue, setStorageValue};