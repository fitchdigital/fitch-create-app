import React from 'react';
import { shallow } from 'enzyme';
import Loading from 'app/pages/loading/index.jsx';

describe('app/pages/loading', () => {
    it('renders Loading page', () => {
        expect(Loading).toBeDefined();
        const tree = shallow(<Loading />);
        expect(tree.find('div')).toBeDefined();
        expect(tree.find('div').text()).toEqual('Loading...');
    });
});
