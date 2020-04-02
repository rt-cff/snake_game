export const DIRECTION = ["left", "top", "right", "down"];
/*
	Left & Right Directiocn is at index 0 & 2 and have x value change at index - 1 per interval
	Top & Down Directiocn is at index 1 & 3 and have y value change at index - 2 per interval
*/

export const randomFoodPosition = (snake) => {
	const x = Math.floor(Math.random() * 14), y = Math.floor(Math.random() * 11);
	
	return snake.some(s => s.x === x && s.y === y) ? randomFoodPosition(snake) : {x, y}
};

export const moveUtil = (state) => {
	const { direct, snake } = state;
	let { x, y } = snake[0];
	const dirIndex = DIRECTION.indexOf(direct);

	if(dirIndex % 2 === 0) 
		x += dirIndex - 1;
	else 
		y += dirIndex - 2;

	return [{ x, y }, ...snake.slice(0, -1)]
}