import {GameActionTypes} from './game.actions'
import {tryConsoleErrorActionNotHandheld} from "../../utils/actionErrorCatchingUtils"
import {shuffleArray} from "./game.util"
import {SUIT} from "../../data/game.data"

export const GameStateEnum =  {
  HOME:"HOME",
  PLAYING:"PLAYING",
  WIN:'WIN',
  END:"ENDED"
}

const INITIAL_STATE = {
  gameState: GameStateEnum.HOME,
  cards:[]
}

const createStack = function (name,cards,cascades,limitSuite) {
  return {
    name:name,
    cards:cards,
    limitSuite:limitSuite,
    cascades:cascades
  }
}



const initGameState= function(sourceDeck){
  let deck =  shuffleArray([...sourceDeck])
  let gameState = {
    stackDic:{
      t1:createStack('t1',deck.splice(0,7),true),
      t2:createStack('t2',deck.splice(0,7),true),
      t3:createStack('t3',deck.splice(0,7),true),
      t4:createStack('t4',deck.splice(0,7),true),
      t5:createStack('t5',deck.splice(0,7),true),
      t6:createStack('t6',deck.splice(0,7),true),
      t7:createStack('t7',deck.splice(0,7),true),
      t8:createStack('t8',deck.splice(0,7),true),
      free1:createStack('free1',[],false),
      free2:createStack('free2',[],false),
      free3:createStack('free3',[],false),
      free4:createStack('free4',[],false),
      f1:createStack('f1',[],false,SUIT.hearts),
      f2:createStack('f2',[],false,SUIT.clubs),
      f3:createStack('f3',[],false,SUIT.spade),
      f4:createStack('f4',[],false,SUIT.diamonds),
    },

  }

  return gameState
}



const gameReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case GameActionTypes.START_NEW_GAME_RESPONSE:

      let newState = initGameState(action.payload.cards)

      return {
        ...state,
        gameState: GameStateEnum.PLAYING,
        ...newState
      }
    case GameActionTypes.END_GAME:
      return {
        ...state,
        gameState: GameStateEnum.END
      }
    case GameActionTypes.WIN:
      return {
        ...state,
        gameState: GameStateEnum.WIN
      }
    case GameActionTypes.GO_TO_WELCOME_SCREEN:
      return {
        ...state,
        gameState: GameStateEnum.HOME
      }
    case GameActionTypes.GO_TO_WIN_SCREEN_RESOLUTION:
      return {
        ...state,
        gameState: GameStateEnum.WIN
      }
    case GameActionTypes.MOVE_CARD_TO_STACK_RESOLUTION:
      let {originStackId,OriginIndex,targetStackId,targetIndex} = action.payload;

      let StackDic =  state.stackDic

      StackDic[originStackId] = {
        ...StackDic[originStackId],
        cards:[...StackDic[originStackId].cards]
      }
      StackDic[targetStackId] = {
        ...StackDic[targetStackId],
        cards:[...StackDic[targetStackId].cards]
      }
      let removed =  StackDic[originStackId].cards.splice(OriginIndex,1)
      StackDic[targetStackId].cards[targetIndex]=removed[0]

      return {
        ...state,
        stackDic:{
          ...StackDic
        }
      }

    default: {
      tryConsoleErrorActionNotHandheld(action.type,GameActionTypes)
      return state
    }
  }
}

export default gameReducer
