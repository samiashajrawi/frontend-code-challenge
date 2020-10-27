import {FavoritePokemon} from '../../../redux/pokemons'
import * as types from '../../../redux/ActionTypes'

describe('FavoritePokemon reducer', () => {
    it('should return the initial state', () => {
      expect(FavoritePokemon(undefined, {})).toEqual({
            errMess: null,
            favorite: true,
            pokemon: null
        })
    })
  
    it('should handle FAVORITE_POKEMON_SUCCESS', () => {
      expect(
        FavoritePokemon([], {
          type: types.FAVORITE_POKEMON_SUCCESS,
          payload: {id: "001", name:"Bulbasaur"}
        })
      ).toEqual({
            errMess: null,
            favorite: true,
            pokemon: {id: "001", name:"Bulbasaur"}
        })
    })
  })