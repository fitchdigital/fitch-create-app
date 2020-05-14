import React from 'react';
import { shallow } from 'enzyme';
import Error from 'app/pages/error/index.jsx';

describe('app/pages/error', () => {
    it('renders Error page', () => {
        expect(Error).toBeDefined();
        const tree = shallow(<Error />);
        expect(tree.find('div')).toBeDefined();
        expect(tree.find('div').text()).toEqual('Error!');
    });
});
