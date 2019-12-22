import {createSelector} from 'reselect'


const selectGame = state => state.game

export const selectGameState = createSelector(
  [selectGame],
  game => {
    return game.gameState
  }
)

export const selectStackDic = (state) => {
  return state.game.stackDic
}

export const selectStack = (state, stackId) => {
  return state.game.stackDic[stackId]
}
