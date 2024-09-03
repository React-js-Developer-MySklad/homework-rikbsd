import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import {Header} from './header';
import {header_logo} from '../../assets/header-logo.svg';

describe('Header', () => {
    it.skip('should contain logo', () => {
        jest.mock('../../assets/header-logo.svg', () => 'kkk');
        jest.unmock('fileMock');
        //jest.unmock('test-file-stub');
        const {container} = render(<Header onClick={()=>{}}/>);
        const logo = container.querySelectorAll('.logo');
//        const header_logo = '../../assets/header-logo.svg';
        console.log(logo);
        expect(logo.length).toEqual(1);
        // expect(logo[0].src).toEqual({header_logo});
    });

    it('should contain button that lift onClick event up', () => {
        const onClick = jest.fn();
        const {container} = render(<Header onClick={onClick}/>);
        const buttonElement = screen.getByText('Добавить');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

