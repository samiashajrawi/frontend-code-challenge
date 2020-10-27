import React from 'react';
import { render, fireEvent, screen } from './test-utils'
import Header from '../../components/HeaderComponent'
describe('CustomDropdown', () => {
    it('render Toast when success', () => {
    render(<Header />, {initialState:{ favoritePokemon: { errMess: null,
        favorite: true,
        pokemon: {name: 'pokemon', isFavorite:true}} }})

        expect(screen.getByText(/Add pokemon to favorites/i)).toBeInTheDocument()
    })

    it('render Toast when faild', () => {
        render(<Header />, {initialState:{ favoritePokemon: { errMess: null,
        favorite: true,
        pokemon: {name: 'pokemon', isFavorite:false}} }})
    
        expect(screen.getByText(/Can not add pokemon to favorites/i)).toBeInTheDocument()
    })
})