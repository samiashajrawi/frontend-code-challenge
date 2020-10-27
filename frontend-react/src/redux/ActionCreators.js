import * as ActionsTypes from './ActionTypes';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import gql from 'graphql-tag';
import { baseUrl } from '../shared/baseUrl';

/**
 * Creates Apollow Client which is used to query Graphql
 * @returns void
 */
function createApolloClient() {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

	const client = new ApolloClient({
    link: new HttpLink({uri: baseUrl}),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    queryDeduplication: true
  });

	return client;
}

export const fetchPokemons  = (limit, offset, searchText, pokemonType, isFavorite) => (dispatch) => {
    dispatch(pokemonsLoading(true));
    const client = createApolloClient();

    return client.query({
      query: gql`
      {
        pokemons(query: { limit: ${parseInt(limit, 10)}, offset: ${parseInt(offset, 10)}, search: "${searchText}", filter: {type: "${pokemonType}", isFavorite: ${isFavorite}} })
        {
          count,
          edges { id, name, image, maxCP, maxHP, types, isFavorite ,weight{minimum, maximum}, height{minimum, maximum}, evolutions{name, image} }
        }
      }`
    }).then(response => {
      return response.data.pokemons;
    })
    .then(pokemons => dispatch(addPokemons(pokemons.edges, pokemons.count)))
    .catch(error => dispatch(pokemonsFaild(error.message)));
}

export const updateSearchParam  = (limit, offset, searchText, pokemonType, isFavorite) => (dispatch) => {
  dispatch(updateSearchParams(offset, searchText, pokemonType, isFavorite));
  
  dispatch(fetchPokemons(limit, offset, searchText, pokemonType, isFavorite));
}

export const updateSearchParams = (offset, searchText, pokemonType, isFavorite) => ({
    type: ActionsTypes.UPDATE_SEARCH,
    payload:  {
      offset:  offset, 
      searchText: searchText, 
      pokemonType: pokemonType, 
      isFavorite: isFavorite
    }
})

export const pokemonsLoading  = () => ({
    type: ActionsTypes.POKEMONS_LOADING
})

export const pokemonsFaild  = (errMssg) => ({
    type: ActionsTypes.POKEMONS_FAILED,
    payload:  errMssg
})

export const addPokemons  = (pokemons, count) => ({
    type: ActionsTypes.ADD_POKEMONS,
    payload:  {
      pokemons: pokemons,
      count: count
    }
})


export const fetchPokemonTypes  = () => (dispatch) =>{
  dispatch(pokemonTypesLoading(true));
  const client = createApolloClient();

  return client.query({
    query: gql`{ pokemonTypes }`
  }).then(response => {
    return [''].concat(response.data.pokemonTypes);
  }).then(pokemons => dispatch(addPokemonTypes(pokemons)))
  .catch(error => dispatch(pokemonTypesFaild(error.message)));
}

export const pokemonTypesLoading  = () => ({
  type: ActionsTypes.POKEMON_TYPES_LOADING
})

export const pokemonTypesFaild  = (errMssg) => ({
  type: ActionsTypes.POKEMON_TYPES_FAILED,
  payload:  errMssg
})

export const addPokemonTypes  = (pokemons) => ({
  type: ActionsTypes.ADD_POKEMON_TYPES,
  payload:  pokemons
})


export const fetchPokemon  = (name) => (dispatch) => {
   dispatch(pokemonLoading(true));
   const client = createApolloClient();

   return client.query({
     query: gql`
     {
      pokemonByName( name: "${name}" )
        {
           id, name, sound, image, maxCP, maxHP, types, isFavorite ,weight{minimum, maximum}, height{minimum, maximum}, evolutions{name, image, isFavorite, id}
        }
     }`
   }).then(response => {
     if (response.data.pokemonByName.id) {
      return response.data.pokemonByName;
     } else {
        var error = new Error('Error: there is no data');
        error.message = 'Error: there is no data';
        throw error;
     }
     
   })
   .then(pokemons => dispatch(addPokemon(pokemons)))
   .catch(error => dispatch(pokemonFaild(error.message)));
}

export const pokemonLoading  = () => ({
   type: ActionsTypes.POKEMON_LOADING
})

export const pokemonFaild  = (errMssg) => ({
   type: ActionsTypes.POKEMON_FAILED,
   payload:  errMssg
})

export const addPokemon  = (pokemon) => ({
   type: ActionsTypes.ADD_POKEMON,
   payload:  pokemon
})

export const favoritePokemon  = (id) => (dispatch) => {
  dispatch(optimisticPokemon({id: id,isFavorite: true}));

  const client = createApolloClient();

  return client.mutate({
    mutation: gql`
    mutation {
       favoritePokemon(id: "${id}") {id, name, isFavorite}
    }`
  }).then(response => {
    return response.data.favoritePokemon;
  })
  .then(pokemons => dispatch(favoritePokemonSuccess(pokemons)))
  .catch(error => dispatch(favoritePokemonFaild(error.message)));
}

export const favoritePokemonSuccess  = (pokemon) => ({
  type: ActionsTypes.FAVORITE_POKEMON_SUCCESS,
  payload:  pokemon
})

export const favoritePokemonFaild  = (errMssg) => ({
  type: ActionsTypes.FAVORITE_POKEMON_FAILD,
  payload:  errMssg
})
export const unFavoritePokemon  = (id) => (dispatch) => {
  dispatch(optimisticPokemon({id: id,isFavorite: false}));
  const client = createApolloClient();

  return client.mutate({
    mutation: gql`
    mutation {
       unFavoritePokemon(id: "${id}") {id, name, isFavorite}
    }`
  }).then(response => {
    return response.data.unFavoritePokemon;
  })
  .then(pokemons => dispatch(unFavoritePokemonSuccess(pokemons)))
  .catch(error => dispatch(unFavoritePokemonFaild(error.message)));
}

export const unFavoritePokemonSuccess  = (pokemon) => ({
  type: ActionsTypes.UNFAVORITE_POKEMON_SUCCESS,
  payload:  pokemon
})

export const unFavoritePokemonFaild  = (errMssg) => ({
  type: ActionsTypes.UNFAVORITE_POKEMON_FAILD,
  payload:  errMssg
})

export const optimisticPokemon  = (pokemon) => ({
  type: ActionsTypes.OPTIMISTIC_POKEMON,
  payload:  pokemon
})