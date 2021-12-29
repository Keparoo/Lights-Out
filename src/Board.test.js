import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

describe('Board should render properly', function() {
	it('renders without crashing', () => {
		render(<Board />);
	});

	it('matches snapshot for full board', () => {
		const { asFragment } = render(<Board chanceLightStartsOn={1} />);
		expect(asFragment()).toMatchSnapshot();
	});

	it('shows You Win! when all lights are out', () => {
		const { getByText } = render(<Board chanceLightStartsOn={0} />);
		expect(getByText('You Win!')).toBeInTheDocument();
	});
});

describe('Test cell click', () => {
	it('toggles the correct lights', () => {
		const { getAllByRole } = render(
			<Board nrows={3} ncols={3} chanceLightStartsOn={1} />
		);
		// Returns array of all cells in order left to right by row top to bottom
		const cells = getAllByRole('button');

		// All cells are lit
		cells.forEach((cell) => expect(cell).toHaveClass('Cell-lit'));

		// Click on center cell
		fireEvent.click(cells[4]);

		// Only corners should now be lit
		const litCells = [ 0, 2, 6, 8 ];
		cells.forEach((cell, idx) => {
			if (litCells.includes(idx)) {
				expect(cell).toHaveClass('Cell-lit');
			} else {
				expect(cell).not.toHaveClass('Cell-lit');
			}
		});
	});

	it('displays You Win! when board is completed', () => {
		//Create 1 row, 3 col board: one-click to win
		const { queryByText, getAllByRole } = render(
			<Board nrows={1} ncols={3} chanceLightStartsOn={1} />
		);

		// All cells lit
		expect(queryByText('You Win!')).not.toBeInTheDocument();

		// Click on center cell to win
		const cells = getAllByRole('button');
		fireEvent.click(cells[1]);
		expect(queryByText('You Win!')).toBeInTheDocument();
	});
});
