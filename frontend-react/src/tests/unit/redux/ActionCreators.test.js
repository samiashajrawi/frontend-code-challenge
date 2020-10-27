import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect' // You can use any testing library
import * as actions from '../../../redux/ActionCreators'
import * as types from '../../../redux/ActionTypes'
import { ApolloClient } from '@apollo/client';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {
  it('should create an action to a ADD_POKEMON', () => {
    const text = 'Test add pokemon'
    const expectedAction = {
      type: types.ADD_POKEMON,
      payload: text
    }
    expect(actions.addPokemon(text)).toEqual(expectedAction)
  })
})

describe('async actions', () => {
  it('creates ADD_POKEMON when fetching fetchPokemon has been done', async () => {

    const expectedActions = [
      { type: types.POKEMON_LOADING },
      { type: types.ADD_POKEMON }
    ]
    const store = mockStore({ pokemon: {} })

    return store.dispatch(actions.fetchPokemon('Ivysaur')).then(() => {
      const returnActions = store.getActions();
      // return of async actions
      expect(returnActions.length).toEqual(expectedActions.length)
      for(let i in returnActions)
        expect(returnActions[i].type).toEqual(expectedActions[i].type)
    })
  })
})