import {createContext} from "react";
import {DataContextState} from "./datacontext.type";

export const DataContext = createContext<DataContextState>(null);