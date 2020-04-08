import React from 'react'
import {shallow} from 'enzyme'

import Row, {getRowProps} from './Row'
import Cell from './Cell'
import pretty from 'pretty'

import * as SnakeContext from '../context/SnakeContext'

beforeEach(() => {

});

afterEach(() => {

});

let mockContext = null


describe("Test Row", () => {
    beforeAll(() => {
        // jest.spyOn(SnakeContext, '')
    })

    const mockContext = (state) => {
        jest.spyOn(SnakeContext, 'useContext').mockImplementation(() => ({
            state
        }))
    }

    it("should render a row with head, body and food", () => {
        mockContext({
            snake: [
                {x: 4, y: 5}
            ], 
            food: {
                x: 1, y: 5
            }
        })
        
        const wrapper = shallow(<Row yaxis = {5}/>)
        const cells = wrapper.children()

        expect(wrapper.exists('.row')).toEqual(true)
        expect(cells.findWhere(c => c.props().head && c.props().active)).toHaveLength(1)
        expect(cells.findWhere(c => c.props().head)).toHaveLength(1)
        expect(cells.findWhere(c => c.props().active)).toHaveLength(1)
        expect(cells.findWhere(c => c.props().food)).toHaveLength(1)
    });

    it("should render a row with head, body only", () => {
        mockContext({
            snake: [
                {x: 4, y: 5}
            ], 
            food: {
                x: 1, y: 2
            }
        })
        
        const wrapper = shallow(<Row yaxis = {5}/>)
        const cells = wrapper.children()

        expect(wrapper.exists('.row')).toEqual(true)
        expect(cells.findWhere(c => c.props().head)).toHaveLength(1)
        expect(cells.findWhere(c => c.props().active)).toHaveLength(1)
        expect(cells.findWhere(c => c.props().food)).toHaveLength(0)
    });

    it("should render a row with food only", () => {
        mockContext({
            snake: [
                {x: 4, y: 2}
            ], 
            food: {
                x: 1, y: 5
            }
        })
        
        const wrapper = shallow(<Row yaxis = {5}/>)
        const cells = wrapper.children()

        expect(wrapper.exists('.row')).toEqual(true)
        expect(cells.findWhere(c => c.props().head)).toHaveLength(0)
        expect(cells.findWhere(c => c.props().active)).toHaveLength(0)
        expect(cells.findWhere(c => c.props().food)).toHaveLength(1)
    });
})

describe("Test getRowProps", () => {
    it('should return head and active only', () => {
        const props = getRowProps([{x: 5, y: 5}], {x: 1, y: 2}, 5, 5)

        expect(props).toEqual({
            head: true, 
            active: true,
            food: false, 
        })
    })

    it('should return food only', () => {
        const props = getRowProps([{x: 5, y: 5}], {x: 1, y: 2}, 1, 2)
        
        expect(props).toEqual({
            head: false, 
            active: false,
            food: true, 
        })
    })

    it('should return nothing', () => {
        const props = getRowProps([{x: 5, y: 5}], {x: 1, y: 2}, 4, 4)
        
        expect(props).toEqual({
            head: false, 
            active: false,
            food: false, 
        })
    })

    it('should return active only', () => {
        const props = getRowProps([{x: 5, y: 5}, {x: 4, y: 5}], {x: 1, y: 2}, 4, 5)
        
        expect(props).toEqual({
            head: false, 
            active: true,
            food: false, 
        })
    })
})