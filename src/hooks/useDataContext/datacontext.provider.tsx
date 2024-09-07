import {PropsWithChildren, useState} from "react";
import {DataContext} from "./datacontext.context";
import {DataContextState} from "./datacontext.type";
import {httpRequest} from "../../tools/http-request";
import {CounterPartyRecord} from "../../model/counter_party_record.type";
import {v4 as uuidv4} from "uuid";

const baseUrl = 'http://localhost:3000';
export const DataContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [items, setItems] = useState([]);
    const context = {
        loadAll: () => {
            httpRequest<CounterPartyRecord[]>(baseUrl + '/counterparty', {
                headers: {'Content-Type': 'application/json'},
                method: 'GET'
            })
            .then(res => {
                setItems(res);
            });
        },
        add: (item) => {
            item.id = uuidv4();
            httpRequest<CounterPartyRecord>(baseUrl + '/counterparty', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(item)
            })
            .then(res => {
            })
            .catch((res) => {
                if (res.status === 201) {
                    context.loadAll();
                }
            });
        },
        apply: (item) => {
            httpRequest<CounterPartyRecord[]>(baseUrl + '/counterparty/' + item.id, {
                headers: {'Content-Type': 'application/json'},
                method: 'PUT',
                body: JSON.stringify(item)
            })
            .then(res => {
                context.loadAll();
            });
        },
        delete: (id: string) => {
            httpRequest<CounterPartyRecord>(baseUrl + '/counterparty/' + id, {
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE'
            })
            .then(res => {
                console.log("RES: ", res);
                context.loadAll();
                // setItems(res);
            });
        },
        items: items
    } as DataContextState;

    return <DataContext.Provider value={context}>{children}</DataContext.Provider>
}
