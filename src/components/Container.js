import React, { useContext, useState, useEffect, useCallback, useRef, useImperativeHandle } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
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
		reset
	} = useContext(SnakeContext);
	const containerRef = useRef();
	useImperativeHandle(ref, () => ({
	  focus: () => {
		containerRef.current.focus();
	  }
	}));

	useEffect(() => {
		const length = snake.length;
		if (
			snake[0].x < 0 ||
			snake[0].y < 0 ||
			snake[0].x > 13 ||
			snake[0].y > 10 ||
			(snake.length >= 3 && _.findIndex(snake.slice(1), snake[0]) !== -1)
		) {
			setStop();
		}

		if (foodExist) {
			if (snake[0].x === food.x && snake[0].y === food.y) {
				eatFood(LAST_LOCATION);
			}
		} else {
			createFood();
		}

		LAST_LOCATION = snake[length - 1];
	}, [snake, foodExist]);

	const onKeyDownHandler = useCallback(({ keyCode }) => {
		if (keyCode === 13) 
			reset();

		if([37, 38, 39, 40].includes(keyCode))
			changeDirection(keyCode - 37);
	}, []);

	useInterval(move, !stop ? 250 : null);

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
