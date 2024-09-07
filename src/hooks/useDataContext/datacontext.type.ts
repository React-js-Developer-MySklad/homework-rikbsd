import {CounterPartyRecord} from "../../model/counter_party_record.type";

export type DataContextState = {
    loadAll: () => void,
    add: (item: CounterPartyRecord) => void,
    apply: (item: CounterPartyRecord) => void,
    delete: (id: string) => void,
    items: CounterPartyRecord[]
}