import {all, call, takeLatest, put} from 'redux-saga/effects'
import {select} from "@redux-saga/core/effects"
import {GameActionTypes} from '../game/game.actions'
import {goToWinScreenResolution, moveCardToStackResolution, startNewGameResponse} from "./game.actions"
import {checkForWinCondition, determineValidMove, helperCanMoveCardFromTableau} from "./game.logic"
import GAME_DATA from "../../data/game.data"


export const selectStackDic = (state) => {
  return state.game.stackDic
}

export function* START_NEW_GAME_REQUESTED_fn() {
  //load game data

  yield put((startNewGameResponse(GAME_DATA)))
}



function* CARD_TO_FREE_STACK_REQUESTEDDfn({payload}) {
  let {card, stackId, index} = payload
  let StackDic = yield select(selectStackDic)

  let canFromTableau = helperCanMoveCardFromTableau(StackDic, card, stackId, index)
  if (canFromTableau) {
    let avilableFreeStack = null
    for (let i = 1; i < 5; i++) {
      if (StackDic["free" + i].cards.length === 0) {
        avilableFreeStack = StackDic["free" + i]
      }
    }

    if (avilableFreeStack) {
      yield(put(moveCardToStackResolution({
        originStackId: stackId,
        OriginIndex: index,
        targetStackId: avilableFreeStack.name,
        targetIndex: 0
      })))
    } else {
      //yield message to end user
    }
  }

  yield null
}


function* onSTART_NEW_GAME_REQUESTED() {
  yield takeLatest(GameActionTypes.START_NEW_GAME_REQUESTED, START_NEW_GAME_REQUESTED_fn)
}

function* onCARD_TO_FREE_STACK_REQUESTED() {
  yield takeLatest(GameActionTypes.CARD_TO_FREE_STACK_REQUESTED, CARD_TO_FREE_STACK_REQUESTEDDfn)
}


function* MOVE_CARD_TO_STACK_REQUESTEDfn({payload}) {

  let {sourceCard, sourceStackId, originIndex, targetStackId, targetLimitSuite} = payload
  let StackDic = yield select(selectStackDic)
  let result = determineValidMove(StackDic, sourceCard, sourceStackId, originIndex, targetStackId, targetLimitSuite)

  if (result.isMoveValid) {
    yield(put(moveCardToStackResolution({
      originStackId: result.originStackId,
      OriginIndex: result.OriginIndex,
      targetStackId: result.targetStackId,
      targetIndex: result.targetIndex
    })))
    if(result.runWinLogic){
      //note optimization : runWinLogic is returned true only for a valid move into foundation

      if(checkForWinCondition(StackDic)){
        //yield win screen
        yield(put(goToWinScreenResolution()))
      }
      else{
        //no win yet
      }
    }
  } else {
    //move is not valid, inform the end user via message
  }

  yield null
}

function* onMOVE_CARD_TO_STACK_REQUESTED() {
  yield takeLatest(GameActionTypes.MOVE_CARD_TO_STACK_REQUESTED, MOVE_CARD_TO_STACK_REQUESTEDfn)
}


export function* gameSagas() {
  yield all([
    call(onSTART_NEW_GAME_REQUESTED),
    call(onCARD_TO_FREE_STACK_REQUESTED),
    call(onMOVE_CARD_TO_STACK_REQUESTED)
  ])
}
