import React, {useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

import {useLocalStorage} from "../../lib/local_storage"
import {TableTemplate} from "./table_template";
import {CounterPartyRecord} from "../../model/counter_party_record.type";
import './table.css';
import itemsInitial from './items';
import {useDataContext} from "../../hooks/useDataContext/datacontext.hook";


type iProps = {
    data: CounterPartyRecord|null,
    modalCallBack: (data: CounterPartyRecord) => void
}


export const Table: React.FC<iProps> = ({data, modalCallBack}) => {
    const [items, setItems] = useLocalStorage('items', itemsInitial);
    const dataContext = useDataContext();

    const dataContext2 = {
        loadAll: () => {
            console.log("loading...");
        },
        add: (item: CounterPartyRecord) => {
            item.id = uuidv4();
            setItems([...items, item]);
        },
        apply: (item: CounterPartyRecord) => {
            const newItems = items.map((v: CounterPartyRecord) => {
                return v.id == item.id ? item : v;
            });
            setItems(newItems)
        },
        delete: (id: string) => {
            setItems(items.filter(((item: CounterPartyRecord) => item.id != id)));
        },
        items: items
    }

    useEffect(() => {
        dataContext.loadAll();
    }, []);

    useEffect(() => {
        if (data === null) {
            return;
        }

        (data.id === null || data.id === '') ? dataContext.add(data) : dataContext.apply(data);
    }, [data]);


    const onTrashClick = (id: string) => {
        dataContext.delete(id);
    };


    const onRowClick = (id: string) => {
        modalCallBack(dataContext.items.filter(((item: CounterPartyRecord) => item.id == id))[0]);
    };


    return (<>
        <div className="relative overflow-x-auto">
            <TableTemplate data={dataContext.items} onTrashClick={onTrashClick} onRowClick={onRowClick}/>
        </div>
    </>);
}
