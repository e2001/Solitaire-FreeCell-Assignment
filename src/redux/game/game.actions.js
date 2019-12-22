
export const GameActionTypes =  {
  START_NEW_GAME_REQUESTED:"START_NEW_GAME_REQUESTED",
  START_NEW_GAME_RESPONSE:"START_NEW_GAME_RESPONSE",
  END_GAME:"END_GAME",
  GO_TO_WELCOME_SCREEN:"GO_TO_WELCOME_SCREEN",
  GO_TO_WIN_SCREEN_RESOLUTION:"GO_TO_WIN_SCREEN_RESOLUTION",
  CARD_TO_FREE_STACK_REQUESTED:"CARD_TO_FREE_STACK_REQUESTED",
  MOVE_CARD_TO_STACK_RESOLUTION:"MOVE_CARD_TO_STACK_RESOLUTION",
  MOVE_CARD_TO_STACK_REQUESTED:"MOVE_CARD_TO_STACK_REQUESTED",
}

export const startNewGameRequested = () => ({
  type: GameActionTypes.START_NEW_GAME_REQUESTED
});

export const startNewGameResponse = gameData => ({
  type: GameActionTypes.START_NEW_GAME_RESPONSE,
  payload: gameData
})

export const moveCardToStackRequested = ({sourceCard,sourceStackId,originIndex,targetStackId,targetLimitSuite}) => {
  return{
    type: GameActionTypes.MOVE_CARD_TO_STACK_REQUESTED,
    payload: {
      sourceCard,
      sourceStackId,
      originIndex,
      targetStackId,
      targetLimitSuite
    }
  }
}

export const cardToFreeStackRequested = (card,stackId,index) => {
  return{
    type: GameActionTypes.CARD_TO_FREE_STACK_REQUESTED,
    payload: {
      card,
      stackId,
      index
    }
  }
}

export const moveCardToStackResolution = ({originStackId,OriginIndex,targetStackId,targetIndex}) => {
  return{
    type: GameActionTypes.MOVE_CARD_TO_STACK_RESOLUTION,
    payload: {
      originStackId,
      OriginIndex,
      targetStackId,
      targetIndex
    }
  }
}


export const endGameDo = () => ({
  type: GameActionTypes.END_GAME
});
export const goToWelcomeScreen = () => ({
  type: GameActionTypes.GO_TO_WELCOME_SCREEN
});
export const goToWinScreenResolution = () => ({
  type: GameActionTypes.GO_TO_WIN_SCREEN_RESOLUTION
});
