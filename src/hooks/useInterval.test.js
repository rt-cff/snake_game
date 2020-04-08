import React from 'react'
import {shallow, mount} from 'enzyme'

import useInterval from './useInterval'

beforeEach(() => {

});

afterEach(() => {

});

let mockContext = null

const MockComp = ({cb, timer}) => {
    useInterval(cb, timer)

    return null
}

jest.useFakeTimers();

describe("Test Row", () => {
    const cb = jest.fn()

    beforeAll(() => {
        // jest.spyOn(SnakeContext, '')
        
    })

    it("should call changeDirection and reset on keydown", () => {
        const wrapper = mount(<MockComp cb = {cb} timer = {null} />)
        expect(cb).toHaveBeenCalledTimes(0)

        wrapper.unmount()
    });

    it("should call changeDirection and reset on keydown", () => {
        const wrapper = mount(<MockComp cb = {cb} timer = {250} />)

        expect(cb).toHaveBeenCalledTimes(0)

        jest.advanceTimersByTime(250);
        expect(cb).toHaveBeenCalledTimes(1)

        jest.advanceTimersByTime(200);
        expect(cb).toHaveBeenCalledTimes(1)
        
        jest.advanceTimersByTime(250);
        expect(cb).toHaveBeenCalledTimes(2)
        
        wrapper.unmount()
        
        jest.advanceTimersByTime(250);
        jest.advanceTimersByTime(250);
        jest.advanceTimersByTime(250);
        
        expect(cb).toHaveBeenCalledTimes(2)
    });

})
