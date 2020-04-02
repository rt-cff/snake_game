import createContextHelper from "./create.context.helper";
import { act } from "react-dom/test-utils";

import {DIRECTION, randomFoodPosition, moveUtil} from './util'

const initialState = {
	snake: [{ x: 6, y: 5 }],
	direct: "top",
	food: randomFoodPosition([{ x: 6, y: 5 }]),
	food: {x:6,y:3},
	foodExist: false,
	stop: true, 
	lastLocation: {}
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case actionTypes.CHANGE_DIRECTION:
			if(state.stop) 
				return state

			//return original state if same direction or opposite direction
			return (state.direct === payload || Math.abs(DIRECTION.indexOf(payload) - DIRECTION.indexOf(state.direct)) === 2) ? state : { ...state, direct: payload };
		case actionTypes.MOVE:
			return { ...state, snake: moveUtil(state), lastLocation: state.snake.slice(-1)[0]};
		case actionTypes.CREATE_FOOD:
			return { ...state, food: randomFoodPosition(state.snake), foodExist: true }
		case actionTypes.EAT_FOOD:
			return { ...state, ...payload, snake: [...state.snake, payload], foodExist: false };
		case actionTypes.STOP:
			return { ...state, stop: true };
		case actionTypes.RESET:
			//do no reset if the game is running
			return state.stop ? { ...initialState, stop: false } : state;
		case actionTypes.CHECK_STATUS:
			if (
				state.snake[0].x < 0 ||
				state.snake[0].y < 0 ||
				state.snake[0].x > 13 ||
				state.snake[0].y > 10 ||
				state.snake.slice(1).some(s => s.x === state.snake[0].x && s.y === state.snake[0].y)
			) return { ...state, stop: true }
			return state
		case actionTypes.CHECK_FOOD_STATUS:
			if(state.snake[0].x === state.food.x && state.snake[0].y === state.food.y)
				return { 
					...state, 
					snake: [...state.snake, state.lastLocation], 
					food: randomFoodPosition(state.snake), 
					foodExist: true
				}
			else 
				return state
		default:
			return state;
	}
};

const move = (dispatch) => () => {
	dispatch({
		type: actionTypes.MOVE
	});
};

const changeDirection = (dispatch) => (direct) => {
	dispatch({
		type: actionTypes.CHANGE_DIRECTION,
		payload: DIRECTION[direct]
	});
};

const createFood = (dispatch) => () => {
	dispatch({
		type: actionTypes.CREATE_FOOD,
	});
};

const eatFood = (dispatch) => (last_location) => {
	dispatch({
		type: actionTypes.EAT_FOOD,
		payload: last_location
	});
};

const setStop = (dispatch) => () => {
	dispatch({
		type: actionTypes.STOP
	});
};

const reset = (dispatch) => () => {
	dispatch({
		type: actionTypes.RESET
	});
};

const checkStatus = (dispatch) => () => {
	dispatch({
		type: actionTypes.CHECK_STATUS
	})
}

const checkFoodStatus = (dispatch) => () => {
	dispatch({
		type: actionTypes.CHECK_FOOD_STATUS
	})
}

export const { Context, Provider } = createContextHelper(
	reducer,
	{ changeDirection, move, createFood, eatFood, setStop, reset, checkStatus, checkFoodStatus },
	initialState
);

const actionTypes = {
	MOVE: "MOVE",
	CHANGE_DIRECTION: "CHANGE_DIRECTION",
	CREATE_FOOD: "CREATE_FOOD",
	EAT_FOOD: "EAT_FOOD",
	STOP: "STOP",
	RESET: "RESET", 
	CHECK_STATUS: "CHECK_STATUS", 
	CHECK_FOOD_STATUS: "CHECK_FOOD_STATUS", 
};