import React, {useEffect} from "react";

import {TableTemplate} from "./table_template";
import {CounterPartyRecord} from "../../model/counter_party_record.type";
import './table.css';
import {useDataContext} from "../../hooks/useDataContext/datacontext.hook";


type iProps = {
    data: CounterPartyRecord|null,
    modalCallBack: (data: CounterPartyRecord) => void
}


export const Table: React.FC<iProps> = ({data, modalCallBack}) => {
    const dataContext = useDataContext();

    useEffect(() => {
        dataContext.loadAll();
    }, []);

    useEffect(() => {
        if (data === null) {
            return;
        }

        (data.id === null || data.id === '' || data.id === undefined) ? dataContext.add(data) : dataContext.apply(data);
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
