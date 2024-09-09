import React, {PropsWithChildren} from "react";
import { v4 as uuidv4 } from 'uuid';

import './local_storage_mock'
import {useLocalStorage} from "../local_storage";
import itemsInitial from '../../components/table/items';
import {CounterPartyRecord} from "../../model/counter_party_record.type";
import {DataContextState} from "../../hooks/useDataContext/datacontext.type";
import {DataContext} from "../../hooks/useDataContext/datacontext.context";

export const DataContextProviderMock: React.FC<PropsWithChildren> = ({children}) => {
    const [items, setItems] = useLocalStorage('items', itemsInitial);

    const dataContextMock = {
        loadAll: () => dataContextMock.items,
        add: (item: CounterPartyRecord) => {
            item.id = uuidv4();
            setItems([...dataContextMock.items, item]);
        },
        apply: (item: CounterPartyRecord) => {
            const newItems = dataContextMock.items.map((v: CounterPartyRecord) => {
                return v.id == item.id ? item : v;
            });
            setItems(newItems)
        },
        delete: (id: string) => setItems(dataContextMock.items.filter(((item: CounterPartyRecord) => item.id != id))),
        setItemsLock: (items: CounterPartyRecord[]) => {
             setItems(items);
        },
        items: items,
    } as DataContextState;

    return <DataContext.Provider value={dataContextMock}>{children}</DataContext.Provider>;
}