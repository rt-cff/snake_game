import React from 'react'
import {shallow} from 'enzyme'

import Container, {} from './Container'
import * as SnakeContext from '../context/SnakeContext'
import useInterval from '../hooks/useInterval'

beforeEach(() => {

});

afterEach(() => {

});

let mockContext = null


describe("Test Row", () => {
    const changeDirection = jest.fn(), 
          reset = jest.fn(),
          useInterval = jest.fn()

    beforeAll(() => {
        // jest.spyOn(SnakeContext, '')
        
    })

    const mockContext = (state) => {
        jest.spyOn(SnakeContext, 'useContext').mockImplementation(() => ({
            state, 
            changeDirection, 
            reset
        }))
    }

    it("should call changeDirection and reset on keydown", () => {
        mockContext({snake: [], food: {}})

        const container = shallow(<Container />)
        container.simulate('keydown', {keyCode: 37})
        container.simulate('keydown', {keyCode: 38})
        container.simulate('keydown', {keyCode: 39})
        container.simulate('keydown', {keyCode: 40})
        container.simulate('keydown', {keyCode: 13})

        expect(changeDirection).toHaveBeenCalledTimes(4)
        expect(reset).toHaveBeenCalled()
    });

    // it("should call reset on click", () => {
    //     mockContext({snake: [], food: {}})

    //     const container = shallow(<Container />)

    //     expect(useInterval).toHaveBeenCalled()
    // });

    
})
