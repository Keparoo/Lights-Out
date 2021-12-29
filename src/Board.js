import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) => {
	/** Create a board nrows high/ncols wide, each cell randomly lit or unlit */
	const createBoard = () => {
		let initialBoard = [];

		for (let row = 0; row < nrows; row++) {
			initialBoard[row] = [];
			for (let col = 0; col < ncols; col++) {
				initialBoard[row].push(Math.random() < chanceLightStartsOn);
			}
		}
		return initialBoard;
	};

	const hasWon = () => {
		// Return true if player has won, else return false
		return board.every((row) => row.every((cell) => !cell));
	};

	const flipCellsAround = (coord) => {
		// Flip cell clicked on and the ones above, below, left and right if they exist
		setBoard((oldBoard) => {
			const [ y, x ] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// If this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// Make a (deep) copy of the oldBoard
			const newBoard = oldBoard.map((row) => [ ...row ]);

			// Flip this cell and the cells around it
			flipCell(y, x, newBoard);
			flipCell(y - 1, x, newBoard);
			flipCell(y, x - 1, newBoard);
			flipCell(y + 1, x, newBoard);
			flipCell(y, x + 1, newBoard);

			return newBoard;
		});
	};

	const [ board, setBoard ] = useState(createBoard());

	// If the game is won, just show a winning msg & render nothing else
	if (hasWon()) return <div>You Win!</div>;

	// Create html instance of board for display
	const htmlBoard = board.map((r, y) => (
		<tr key={y}>
			{r.map((c, x) => (
				<Cell
					flipCellsAroundMe={() => flipCellsAround(y + '-' + x)}
					isLit={c}
					key={y + '-' + x}
				/>
			))}
		</tr>
	));

	return (
		<div>
			<h1>Lights Out</h1>
			<table className="Board">
				<tbody>{htmlBoard}</tbody>
			</table>
		</div>
	);
};

export default Board;
