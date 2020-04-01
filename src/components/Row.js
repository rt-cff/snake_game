import React, {useContext, useMemo} from "react";
import { Context as SnakeContext } from '../context/SnakeContext'
import Cell from "./Cell";

import _range from 'lodash/range'

const getRow = (snake, food, y) => x => {
	const active = snake.filter(s => s.y === y).map(s => s.x).includes(x)
	const head = snake[0].y === y ? snake[0].x === x : false
	const _food =  food.y === y ? food.x === x : false

	return <Cell key={x} active={active} head={head} food={_food} />
}

const Row = ({ yaxis: y }) => {
	const { state: { snake, food } } = useContext(SnakeContext)
	const row = useMemo(() => _range(14).map(getRow(snake, food, y)), [snake, food, y])

	return <div className="row">{row}</div>
}

export default Row;