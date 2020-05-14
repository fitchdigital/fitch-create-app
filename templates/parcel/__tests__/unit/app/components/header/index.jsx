import React from 'react';
import { shallow } from 'enzyme';
import Header from 'app/components/header/index.jsx';

describe('app/components/header', () => {
    it('renders Header component', () => {
        expect(Header).toBeDefined();
        const tree = shallow(<Header />);
        expect(tree.find('div')).toBeDefined();
        expect(tree.text()).toContain('--TITLE--');
    });
});
