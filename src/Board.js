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
	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	const createBoard = () => {
		let initialBoard = [];
		// create array-of-arrays of true/false values
		for (let row = 0; row < nrows; row++) {
			initialBoard[row] = [];
		}
		for (let row = 0; row < nrows; row++) {
			for (let col = 0; col < ncols; col++) {
				initialBoard[row].push(Math.random() > chanceLightStartsOn);
			}
		}
		return initialBoard;
	};

	const hasWon = () => {
		// Return true if player has won, else return false
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[row].length; col++) {
				if (board[row[col]]) return false;
			}
		}
		return true;
	};

	const flipCellsAround = (coord) => {
		setBoard((oldBoard) => {
			const [ y, x ] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard

			// TODO: in the copy, flip this cell and the cells around it

			// TODO: return the copy
		});
	};

	const [ board, setBoard ] = useState(createBoard());
	console.log(board);

	// if the game is won, just show a winning msg & render nothing else

	return (
		<div>
			<h1>Lights Out</h1>
			<table className="Board">
				<tbody>
					{board.map((r) => (
						<tr>
							{r.map((c) => (
								<Cell flipCellsAroundMe={flipCellsAround} isLit={true} />
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Board;
