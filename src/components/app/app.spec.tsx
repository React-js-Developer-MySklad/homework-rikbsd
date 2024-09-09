import React from 'react';
import {render} from "@testing-library/react";
import {App} from './app';

jest.mock('../table/table', () => ({Table: () => <div>{'Table add mock.'}</div>}));
jest.mock('../modal/modal', () => ({AddModal: () => <div>{'Modal edit mock.'}</div>}));

describe('App', () => {
	it('should render a <header/>', () => {
		const {container} = render(<App />);
		expect(container.querySelectorAll('header').length).toEqual(1);
	});

	it('should render a <main/>', () => {
		const {container} = render(<App />);
		expect(container.querySelectorAll('main').length).toEqual(1);
	});

	it('should render a <footer/>', () => {
		const {container} = render(<App />);
		expect(container.querySelectorAll('footer').length).toEqual(1);
	});
});

