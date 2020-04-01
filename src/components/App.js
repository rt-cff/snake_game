import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import "./css/style.css";
import Container from "./Container";
import Row from "./Row";

import _range from 'lodash/range'

let inital = 0

const GameMsgComponent = ({stop, onConfirm}) => {
	const msgObj = inital === 0 ? {msg: 'Welcome', btnTitle: 'Start'} : {msg: 'GameOver', btnTitle: 'Reset'}

	inital++

	if(!stop) return null

	return (
		<div className="msg">
			<div className="msg-bg" />
			<div>
				<div className="msg-title">{msgObj.msg}</div>
				<button onClick={onConfirm} className="msg-btn">
					{msgObj.btnTitle}
				</button>
			</div>
		</div>
	)
}
GameMsgComponent.displayName = 'GameMsg'

const GameMsg = React.memo(GameMsgComponent)

const getRows = (rows) => {
	console.log('memo')
	return _range(rows).map(r => <Row key = {r} yaxis = {r} />)
}

let prev = null

const App = () => {
	const {
		state: { stop },
		reset
	} = useContext(SnakeContext);
	const containerRef = React.createRef()

	useEffect(() => {
		containerRef.current.focus()
	}, [])

	const rows = useMemo(() => getRows(11), [])

	return (
		<Container ref={containerRef}>
			<GameMsg stop = {stop} onConfirm = {reset}/>
			{rows}		</Container>
	);
};

export default App;
