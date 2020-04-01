import React from "react";

const Cell = ({ active, head, food }) => {
	return (
		<div
			className={`cell ${active ? "active" : ""} ${head ? "head" : ""} ${food ? "food" : ""}`}
		></div>
	);
};

export default React.memo(Cell);
