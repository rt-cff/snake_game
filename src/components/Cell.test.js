import React from 'react'
import {shallow} from 'enzyme'

import Cell from './Cell'

beforeEach(() => {

});

afterEach(() => {

});

describe("Render Cell", () => {
    it("should render a div with classname cell", () => {
        const wrapper = shallow(<Cell />);
        expect(wrapper.hasClass('cell')).toEqual(true);
    });

    it("should render a div with classname cell and active", () => {
        const wrapper = shallow(<Cell active = {true}/>);
        expect(wrapper.find('.cell').hasClass('active')).toEqual(true);
    });

    it("should render a div with classname cell and head", () => {
        const wrapper = shallow(<Cell head = {true} active = {true}/>);
        expect(wrapper.find('.cell').hasClass('head')).toEqual(true);
    });

    it("should render a div with classname cell and food", () => {
        const wrapper = shallow(<Cell food = {true}/>);
        expect(wrapper.find('.cell').hasClass('food')).toEqual(true);
    });
}); 
