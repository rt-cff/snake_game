import React, {
	cloneElement,
	useContext,
	useState,
	useEffect,
	useMemo
} from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import Cell from "./Cell";

const Row = ({ yaxis }) => {
	const {
		state: { snake, food }
	} = useContext(SnakeContext);

	const row = useMemo(() => {
		return [...Array(14)].map((v, i) => {
			let active = false;
			let _food = false;
			let head = false
			snake.forEach((piece) => {
				if (piece.x === i && piece.y === yaxis) {
					active = true;
				}
			});

if(snake[0].x === i && snake[0].y === yaxis) head = true

			if (food.x === i && food.y === yaxis) {
				_food = true;
			}
			return <Cell key={i} food={_food} active={active} head={head}/>;
		});
	}, [snake, food]);

	return <div className="row">{row}</div>;
};

export default Row;
