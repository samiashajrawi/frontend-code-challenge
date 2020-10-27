import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import CustomDropdown from '../../components/Atoms/CustomDropdown';
 
describe('CustomDropdown', () => {
    const types = ["Grass", "Poison", "Fire", "Flying", "Water"];


    test('renders CustomDropdown component', () => {
        render(<CustomDropdown data={types} />);

        expect(screen.getByText('Type')).toBeInTheDocument();
    });

    test('open CustomDropdown component', async () => {
        render(<CustomDropdown data={types} />);
        expect(screen.getByTestId('CustomDropdown')).not.toHaveClass('show');
        await userEvent.click(screen.getAllByRole('link')[0]);
        expect(screen.getByTestId('CustomDropdown')).toHaveClass('show');
    });

    test('click on dropdownList', async () => {
        const selectTypeHandler = jest.fn();
        render(<CustomDropdown data={types} selectTypeHandler={selectTypeHandler} />);
        await userEvent.click(screen.getAllByRole('link')[0]);
        await userEvent.click(screen.getByTestId('DropdownItemGrass'));
        expect(selectTypeHandler).toHaveBeenCalled();
    });

});