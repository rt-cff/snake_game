import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import * as util from "./util";

beforeEach(() => {
});

afterEach(() => {
});

// randomFoodPosition
// moveUtil
// changeDirectionUtil

describe("test randomFoodPosition", () => {
    let snake = [], pos = util.randomFoodPosition(snake)

    it('Position To be Defined', () => {    
        expect(pos).toBeDefined();
    })
    it('Position To have property x & y', () => {
        expect(pos).toHaveProperty('x');
        expect(pos).toHaveProperty('y');
    })
    it('Position X To be greater than 0 and less than 14', () => {
        expect(pos.x).toBeGreaterThanOrEqual(0);
        expect(pos.x).toBeLessThan(14);
    })
    it('Position Y To be greater than 0 and less than 11', () => {
        expect(pos.y).toBeGreaterThanOrEqual(0);
        expect(pos.y).toBeLessThan(11);
    })

    it('Position Not to be Equal with input', () => {
        snake = [{x: 3, y: 5}, {x: 5, y: 9}]
        pos = util.randomFoodPosition(snake)
        expect(snake).not.toContainEqual(pos);
    })

    it('Throw Error if no more available space', () => {
        // expect(() => util.randomFoodPosition(snake)).toThrow('No More Available Space');
        expect(() => util.randomFoodPosition(Array(14*11))).toThrowErrorMatchingSnapshot()
    })
}); 

describe("test moveUtil", () => {
    let state = {}, snake = []

    beforeEach(() => {
//Reinitialize state before each test case, such that they remain pure
        state = {
            snake: [{x: 4, y: 5}], 
            direct: ['top'],
            lastDirect: 'top', 
        }
        snake = util.moveUtil(state)
    })

    it('Snake To be Defined', () => {    
        expect(snake).toBeDefined();
    })
    it('Snake To have length 1', () => {
        expect(snake).toHaveLength(1);
    })
    it('Snake To move top correctly', () => {
        expect(snake).toEqual([{x: 4, y: 4}]);
    })

    it('Snake To move left correctly', () => {
        state.direct = ['left']
        snake = util.moveUtil(state)
  
        expect(snake).toEqual([{x: 3, y: 5}]);
    })

    it('Snake To move right correctly', () => {
        state.direct = ['right']
        snake = util.moveUtil(state)

        expect(snake).toEqual([{x: 5, y: 5}]);
    })

    it('Snake To move down correctly', () => {
        state.direct = ['down']
        snake = util.moveUtil(state)
      
        expect(snake).toEqual([{x: 4, y: 6}]);
    })

    it('Snake should continue the last movement if direct array is empty', () => {
        state.direct = []
        state.lastDrect = 'top'
        snake = util.moveUtil(state)
       
        expect(snake).toEqual([{x: 4, y: 4}]);
    })

    it('Snake should only move 1 interval if direct array contains more than one', () => {
        state.direct = ['top', 'left']
        state.lastDrect = 'top'
        snake = util.moveUtil(state)
        
        expect(snake).toEqual([{x: 4, y: 4}]);
    })
});

describe("test changeDirectionUtil", () => {
    let state = {}, newState = {}

    beforeEach(() => {
        state = { 
            direct: ['top'],
            lastDirect: 'top', 
            dummyState: 1, 
            dummyState2: 3, 
            snake: [{}, {}, {}]
        }
    })

    it('state direct should remain of length 1 if newDirect is same as last direction', () => {
        newState = util.changeDirectionUtil(state, 'top')

        expect(newState).toMatchObject(state)
    })
    it('state direct should remain of length 1 if newDirect is same as last direction 2', () => {
        state.direct = ['top', 'left']
        newState = util.changeDirectionUtil(state, 'left')

        expect(newState).toMatchObject(state)
    })
    it('state direct should remain of length 1 if newDirect is same as last direction 3', () => {
        state.direct = []
        state.lastDirect = 'right'
        newState = util.changeDirectionUtil(state, 'right')

        expect(newState).toMatchObject(state)
    })

    it('state direct should remain of length 1 if newDirect is of opposite direction as last direction', () => {
        newState = util.changeDirectionUtil(state, 'down')

        expect(newState).toMatchObject(state)
    })
    it('state direct should remain of length 1 if newDirect is of opposite direction as last direction 2', () => {
        state.direct = ['top', 'left']
        newState = util.changeDirectionUtil(state, 'right')

        expect(newState).toMatchObject(state)
    })
    it('state direct should remain of length 1 if newDirect is of opposite direction as last direction 3', () => {
        state.direct = []
        state.lastDirect = 'right'
        newState = util.changeDirectionUtil(state, 'left')

        expect(newState).toMatchObject(state)
    })
})