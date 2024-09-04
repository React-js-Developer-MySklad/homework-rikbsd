import React from 'react';
import {renderHook, act} from "@testing-library/react";
import './__mock__/local_storage_mock'
import './local_storage';
import {getStorageValue, useLocalStorage} from "./local_storage";

describe('LocalStorage', () => {
    afterEach(() => {
        localStorage.clear();
    });

    describe('getStorageValue', () => {
        it('should return default value if none in storage', () => {
            expect(getStorageValue('testKey', {value: 'defaultValue'})).toEqual({value: 'defaultValue'});
        });

        it('should return ignore default value if one in storage', () => {
            expect(getStorageValue('testKey', {value: 'defaultValue'})).toEqual({value: 'defaultValue'});
            localStorage.setItem('testKey', JSON.stringify({value: 'nonDefaultValue'}));
            expect(getStorageValue('testKey', {value: 'defaultValue'})).toEqual({value: 'nonDefaultValue'});
        });
    });

    function useLocalStorageTest(initialState: any) {
        const [data, setData] = useLocalStorage('testKey', initialState);

        return {data, setData};
    }

    describe('getStorageValue', () => {
        it('should return default value if none in storage', () => {
            const {result} = renderHook(() => useLocalStorageTest({initKey: 'initValue'}));
            expect(JSON.parse(localStorage.getItem('testKey'))).toEqual({initKey: 'initValue'});
            expect(result.current.data).toEqual({initKey: 'initValue'});
        });

        it('should return storage value if any in storage', () => {
            localStorage.setItem('testKey', JSON.stringify({alreadyIn: 'SomeValue'}));
            const {result} = renderHook(() => useLocalStorageTest({initKey: 'initValue'}));
            expect(result.current.data).toEqual({alreadyIn: 'SomeValue'});
        });

        it('modify storage value via hook set function', () => {
            localStorage.setItem('testKey', JSON.stringify({alreadyIn: 'SomeValue'}));
            const {result} = renderHook(() => useLocalStorageTest({initKey: 'initValue'}));
            expect(result.current.data).toEqual({alreadyIn: 'SomeValue'});

            act(() => {
                result.current.setData((prevState: any) => ({...prevState, newKey: 'newValue'}));
            });

            expect(JSON.parse(localStorage.getItem('testKey'))).toEqual({alreadyIn: 'SomeValue', newKey: 'newValue'});
            expect(result.current.data).toEqual({alreadyIn: 'SomeValue', newKey: 'newValue'});
        });
    });
});

