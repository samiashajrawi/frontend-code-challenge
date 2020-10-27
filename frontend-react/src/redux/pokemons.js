import * as ActionsTypes from './ActionTypes';

export const PokemonsList = (state = { isLoading: true,
    errMess: null,
    data:[],
    count: 0,
    searchText: '',
    pokemonType: '',
    isFavorite: false
}, action) => {
      switch (action.type) {
        case ActionsTypes.UPDATE_SEARCH: 
            const data = action.payload.offset === 0 && [] || state.data;
            return {...state, isLoading: false, errMess: null, data: data, searchText: action.payload.searchText, pokemonType: action.payload.pokemonType, isFavorite: action.payload.isFavorite};
        case ActionsTypes.ADD_POKEMONS:
            return {...state, isLoading: false, errMess: null, data: state.data.concat(action.payload.pokemons), count: action.payload.count};

        case ActionsTypes.POKEMONS_LOADING:
            return {...state, isLoading: true, errMess: null, data: state.data, count: state.count};

        case ActionsTypes.POKEMONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: state.data, count: state.count};
        case ActionsTypes.OPTIMISTIC_POKEMON:
            let pokemonIndex = state.data.findIndex((element) => element.id === action.payload.id);

            if(pokemonIndex > -1 && !state.isFavorite) {
                const data = [...state.data];
                var newData = {};
                for(let k in data[pokemonIndex]) {
                    if (k === 'isFavorite') {
                        newData[k] = action.payload.isFavorite;
                    } else {
                        newData[k] = data[pokemonIndex][k];
                    }
                }

                data[pokemonIndex] = {...newData};
                return {...state, isLoading: false, errMess: null, data: data};
            } else if(pokemonIndex > -1 && state.isFavorite) {
                const data = state.data.filter((e,i) => i !== pokemonIndex);
                return {...state, isLoading: false, errMess: null, data: data};
            }
            return state;
          default:
              return state;
      }
};


export const PokemonTypes = (state = { isLoading: true,
    errMess: null,
    data:[]}, action) => {
      switch (action.type) {
        case ActionsTypes.ADD_POKEMON_TYPES:
            return {...state, isLoading: false, errMess: null, data: action.payload};

        case ActionsTypes.POKEMON_TYPES_LOADING:
            return {...state, isLoading: true, errMess: null, data: []};

        case ActionsTypes.POKEMON_TYPES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};

          default:
              return state;
      }
};

export const Pokemon = (state = { isLoading: true,
    errMess: null,
    data:{}}, action) => {
      switch (action.type) {
        case ActionsTypes.ADD_POKEMON:
            return {...state, isLoading: false, errMess: null, data: action.payload};

        case ActionsTypes.POKEMON_LOADING:
            return {...state, isLoading: true, errMess: null, data: {}};

        case ActionsTypes.POKEMON_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: {}};
        case ActionsTypes.OPTIMISTIC_POKEMON:
            if(state.data.id && state.data.id === action.payload.id) {
                return {...state, isLoading: false, errMess: null, data: Object.assign({}, state.data, {isFavorite: action.payload.isFavorite})};
            } else if(state.data.evolutions) {
                let pokemonIndex = state.data.evolutions.findIndex((element) => element.id === action.payload.id);

                if(pokemonIndex > -1) {
                    const data = [...state.data.evolutions];
                    var newData = {};
                    for(let k in data[pokemonIndex]) {
                        if (k === 'isFavorite') {
                            newData[k] = action.payload.isFavorite;
                        } else {
                            newData[k] = data[pokemonIndex][k];
                        }
                    }

                    data[pokemonIndex] = {...newData};
                    return {...state, isLoading: false, errMess: null, data: Object.assign({}, state.data, {evolutions: data})};
                }
            }
            return state;
        default:
            return state;
      }
};

export const FavoritePokemon = (state = { favorite: true,
    errMess: null,
    pokemon:null}, action) => {
      switch (action.type) {
        case ActionsTypes.UNFAVORITE_POKEMON_FAILD:
            return {...state, favorite: false, errMess: action.payload, pokemon: null};

        case ActionsTypes.UNFAVORITE_POKEMON_SUCCESS:
            return {...state, favorite: false, errMess: null, pokemon: action.payload};

        case ActionsTypes.FAVORITE_POKEMON_FAILD:
            return {...state, favorite: true, errMess: action.payload, pokemon: null};

        case ActionsTypes.FAVORITE_POKEMON_SUCCESS:
                return {...state, favorite: true, errMess: null, pokemon: action.payload};
    
          default:
              return state;
      }
};