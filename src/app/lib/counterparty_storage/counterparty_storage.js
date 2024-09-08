import {getStorageValue, setStorageValue} from "../local_storage/local_storage";
import items from "./item";

const key = 'items';

let counterParty = getStorageValue(key, items);


const getCounterParty = () => {
    return counterParty;
}


const setCounterParty = function(val) {
    counterParty = setStorageValue(key, val)
    return counterParty;
}


// save to storage once any way;
setCounterParty(counterParty);


export {getCounterParty, setCounterParty};