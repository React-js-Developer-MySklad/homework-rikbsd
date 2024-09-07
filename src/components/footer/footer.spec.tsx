import React from 'react';
import {render} from "@testing-library/react";
import {Footer} from './footer';

describe('Footer', () => {
        it('should render the copyright notice with correct date', () => {
                const {container} = render(<Footer />);
                expect(container.textContent).toEqual('© 2007–' + new Date().getFullYear() + ' ООО «Логнекс»');
        });
});

