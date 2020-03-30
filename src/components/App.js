import React, { useState, useContext, useEffect } from "react";
import { Context as SnakeContext } from "../context/SnakeContext";
import "./css/style.css";
import Container from "./Container";
import Row from "./Row";

let inital = 0

const GameMsg = React.memo(({stop, onConfirm}) => {
	const msgObj = inital === 0 ? {msg: 'Welcome', btnTitle: 'Start'} : {msg: 'GameOver', btnTitle: 'Reset'}

	inital++

	if(!stop) return null

	return (
		<React.Profiler>
		<div className="msg">
			<div className="msg-bg" />
			<div>
				<div className="msg-title">{msgObj.msg}</div>
				<button onClick={onConfirm} className="msg-btn">
					{msgObj.btnTitle}
				</button>
			</div>
		</div>			
		</React.Profiler>

	)
})
GameMsg.displayName = 'GameMsg'

const App = () => {
	const {
		state: { stop },
		reset, 
	} = useContext(SnakeContext);
	const containerRef = React.createRef()

	useEffect(() => {
		containerRef.current.focus()
	}, [])

	return (
		<Container ref={containerRef}>
			<GameMsg stop = {stop} onConfirm = {reset}/>
			{[...Array(11)].map((v, i) => (
				<Row key={i} yaxis={i} />
			))}
		</Container>
	);
};

export default App;
