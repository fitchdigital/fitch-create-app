import React from 'react';
import { shallow } from 'enzyme';
import About from 'app/pages/about/index.jsx';

describe('app/pages/about', () => {
    it('renders About page', () => {
        expect(About).toBeDefined();
        const tree = shallow(<About />);
        expect(tree.find('div')).toBeDefined();
        expect(
            tree
                .find('Helmet')
                .find('title')
                .text()
        ).toEqual('About Page');
        expect(tree.find('p').text()).toEqual('This is the about page');
    });
});
