import {createStore, combineReducers, applyMiddleware} from 'redux';
import { PokemonsList, PokemonTypes, Pokemon, FavoritePokemon } from './pokemons';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
 

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            pokemonsList: PokemonsList,
            pokemonTypes: PokemonTypes,
            pokemon: Pokemon,
            favoritePokemon: FavoritePokemon
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}