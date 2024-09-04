import React, {useMemo} from "react";
import {useTable} from "react-table";
import {TrashButton} from "./trash_button";

type iProps = {
    data: any[],
    onRowClick: (id: string) => void,
    onTrashClick: (id: string) => void
}

export const TableTemplate: React.FC<iProps> = ({data, onRowClick, onTrashClick}) => {
    const columns = useMemo(
        () => [
            {Header: 'Наименование', accessor: 'name'},
            {Header: 'ИНН', accessor: 'inn'},
            {Header: 'КПП', accessor: 'kpp'},
            {Header: 'Адрес', accessor: 'address'},
            {Header: 'ID', accessor: 'id'},
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return (
        <>
            <table {...getTableProps({className: 'data-table'})}>
                <thead className={'data-head'}>
                {headerGroups.map((headerGroup) => {
                    const {key, ...restHeaderGroupProps} = headerGroup.getHeaderGroupProps();
                    return (
                    <tr key={key} {...restHeaderGroupProps}>
                        {headerGroup.headers.map((column) => {
                            const {key, ...restHeaderProps} = column.getHeaderProps({className: 'data-head-item'});
                            return (<th key={key} {...restHeaderProps}>{
                                    column.render("Header")
                                }
                                </th>
                            );
                        })}
                    </tr>
                )})}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    const {key, ...restRowProps} = row.getRowProps({className: 'data-row'});
                    return (
                        <tr key={key} {...restRowProps} onClick={() => {onRowClick(row.cells.filter(c => c.column.id === 'id')[0].value)}}>
                            {row.cells.map((cell) => {
                                const {key, ...restCellProps} = cell.getCellProps({className: 'data-col-item'});
                                return (
                                    <td key={key} {...restCellProps}>{
                                        (cell.column.id === 'id') ? <TrashButton id={cell.value} onClick={(event) => {event.stopPropagation(); onTrashClick(cell.value)}}/> : cell.render("Cell")
                                    }</td>
                                );}
                            )}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}
