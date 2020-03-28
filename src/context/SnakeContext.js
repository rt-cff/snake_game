import createContextHelper from "./create.context.helper";
import { act } from "react-dom/test-utils";

const DIRECTION = ["left", "top", "right", "down"];
/*
	Left & Right Directiocn is at index 0 & 2 and have x value change at index - 1 per interval
	Top & Down Directiocn is at index 1 & 3 and have y value change at index - 2 per interval
*/

const initialState = {
	snake: [{ x: 6, y: 5 }],
	direct: "top",
	food: {},
	foodExist: false,
	stop: true
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case actionTypes.CHANGE_DIRECTION:
			if(state.stop) 
				return state

			//return original state if same direction or opposite direction
			return (state.direct === payload || Math.abs(DIRECTION.indexOf(payload) - DIRECTION.indexOf(state.direct)) === 2) ? state : { ...state, direct: payload };
		case actionTypes.MOVE:
			return { ...state, snake: moveUtil(state) };
		case actionTypes.CREATE_FOOD:
			return { ...state, food: randomFoodPosition(state.snake), foodExist: true }
		case actionTypes.EAT_FOOD:
			return { ...state, ...payload, snake: [...state.snake, payload], foodExist: false };
		case actionTypes.STOP:
			return { ...state, stop: true };
		case actionTypes.RESET:
			//do no reset if the game is running
			return state.stop ? { ...initialState, stop: false } : state;
		default:
			return state;
	}
};

const moveUtil = (state) => {
	const { direct, snake } = state;
	let { x, y } = snake[0];
	const dirIndex = DIRECTION.indexOf(direct);

	if(dirIndex % 2 === 0) 
		x += dirIndex - 1;
	else 
		y += dirIndex - 2;

	return [{ x, y }, ...snake.slice(0, -1)]
}

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

export const { Context, Provider } = createContextHelper(
	reducer,
	{ changeDirection, move, createFood, eatFood, setStop, reset },
	initialState
);

const actionTypes = {
	MOVE: "MOVE",
	CHANGE_DIRECTION: "CHANGE_DIRECTION",
	CREATE_FOOD: "CREATE_FOOD",
	EAT_FOOD: "EAT_FOOD",
	STOP: "STOP",
	RESET: "RESET"
};

const randomFoodPosition = (snake) => {
	const x = Math.floor(Math.random() * 14), y = Math.floor(Math.random() * 11);
	
	return snake.some(s => s.x === x && s.y === y) ? randomFoodPosition(snake) : {x, y}
};
