import React from 'react';
import { shallow } from 'enzyme';
import Home from 'app/pages/home/index.jsx';

describe('app/pages/home', () => {
    it('renders Home page', () => {
        expect(Home).toBeDefined();
        const tree = shallow(<Home />);
        expect(tree.find('Home')).toBeDefined();
        expect(
            tree
                .find('Helmet')
                .find('title')
                .text()
        ).toEqual('Home Page');
        expect(tree.find('p').text()).toEqual('This is the home page');
    });
});
