import {DataContext} from "./datacontext.context";
import {useContext} from "react";

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === null) {
        throw Error('useDataContext hook is used outside DataContextProvider')
    }

    return context;
};
