import React, {useContext, useMemo} from "react";
import { Context as SnakeContext, useContext as useSnakeContext } from '../context/SnakeContext'
import Cell from "./Cell";

import _range from 'lodash/range'

export const getRowProps = (snake, _food, x, y) => {
	const props = {}
	
	props.active = snake.filter(s => s.y === y).map(s => s.x).includes(x)
	props.head = snake[0].y === y ? snake[0].x === x : false
	props.food =  _food.y === y ? _food.x === x : false

	return props
}

export const getRow = (snake, food, y) => x => {
	return <Cell key={x} {...getRowProps(snake, food, x, y)}/>
}

const Row = ({ yaxis: y }) => {
	// const { state: { snake, food } } = useContext(SnakeContext)
	const { state: { snake, food } } = useSnakeContext()
	const row = useMemo(() => _range(14).map(getRow(snake, food, y)), [snake, food, y])

	return <div className="row">{row}</div>
}

export default Row;