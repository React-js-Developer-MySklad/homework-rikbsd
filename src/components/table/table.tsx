import React from "react";

import {CounterPartyRecord} from "../../model/counter_party_record";


type iProps = {
    data: CounterPartyRecord|null,
    modalCallBack: (data: CounterPartyRecord) => void
}


export const Table: React.FC<iProps> = ({data, modalCallBack}) => {

    return (<>
    </>);
}
