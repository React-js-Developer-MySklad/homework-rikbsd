import React, {useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

import {useLocalStorage} from "../../lib/local_storage"
import {TableTemplate} from "./table_template";
import {CounterPartyRecord} from "../../model/counter_party_record";
import './table.css';
import itemsInitial from './items';


type iProps = {
    data: CounterPartyRecord|null,
    modalCallBack: (data: CounterPartyRecord) => void
}


export const Table: React.FC<iProps> = ({data, modalCallBack}) => {
    const [items, setItems] = useLocalStorage('items', itemsInitial);

    useEffect(() => {
        if (data === null) {
            return;
        }

        if (data.id === null || data.id === '') {
            data.id = uuidv4();
            setItems([...items, data]);
        } else {
            const newItems = items.map((v: CounterPartyRecord) => {
                return v.id == data.id ? data : v;
            });
            setItems(newItems)
        }
    }, [data]);


    const onTrashClick = (id: string) => {
        setItems(items.filter(((item: CounterPartyRecord) => item.id != id)));
    };


    const onRowClick = (id: string) => {
        modalCallBack(items.filter(((item: CounterPartyRecord) => item.id == id))[0]);
    };


    return (<>
        <div className="relative overflow-x-auto">
            <TableTemplate data={items} onTrashClick={onTrashClick} onRowClick={onRowClick}/>
        </div>
    </>);
}
