import React, { useContext, useState, useEffect, useCallback, useRef, useImperativeHandle } from "react";
import { Context as SnakeContext, useContext as useSnakeContext } from "../context/SnakeContext";
import useInterval from "../hooks/useInterval";
import _ from "lodash";

let LAST_LOCATION = {};

const Container = ({ children }, ref) => {
	const {
		state: { snake, foodExist, food, stop },
		changeDirection,
		move,
		createFood,
		eatFood,
		setStop,
		reset, 
		checkStatus, 
		checkFoodStatus
	// } = useContext(SnakeContext);
	} = useSnakeContext();
	const containerRef = useRef();

	useImperativeHandle(ref, () => ({
	  focus: () => {
		containerRef.current.focus();
	  }
	}));

	const onKeyDownHandler = useCallback(({ keyCode }) => {
		if (keyCode === 13) 
			reset();

		if([37, 38, 39, 40].includes(keyCode))
			changeDirection(keyCode - 37);
	}, [reset, changeDirection]);

	const onTick = useCallback(() => {
		move()
		checkStatus()
		checkFoodStatus()
	}, [move, checkStatus, checkFoodStatus])

	useInterval(onTick, !stop ? 250 : null);

	return (
		<div id='container' ref={containerRef} tabIndex="0" onKeyDown={onKeyDownHandler} className="body">
			<div className="container">
				<div className="score">Your Score: {snake.length - 1}</div>
				{children}
			</div>
		</div>
	);
};
Container.displayName = 'Container'

export default React.forwardRef(Container);
