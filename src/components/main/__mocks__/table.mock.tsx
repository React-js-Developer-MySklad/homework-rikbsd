import React from "react";

const modalFromTable = jest.fn();

const mockTableMock = (props: {data: any, modalCallBack: (arg0: any) => void}) => {
    modalFromTable.mockImplementation(() => {
        props.modalCallBack({'id': 'testId', 'name': 'testName'});
    });
    return <>
        <div>{'Table add mocked data is: ' + JSON.stringify(props.data)}</div>
    </>;
};

export {mockTableMock, modalFromTable};