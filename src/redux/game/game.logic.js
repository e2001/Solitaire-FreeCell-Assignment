
function handelTableauLogic(StackDic, sourceCard, sourceStackId, originIndex, targetStackId) {
  let result = {}

  let targetStack = StackDic[targetStackId]
  let lastCard = null
  if (targetStack.cards.length > 0) {
    lastCard = targetStack.cards[targetStack.cards.length - 1]
  }
  if (!lastCard) {
    result = {
      isMoveValid: true,
      originStackId: sourceStackId,
      OriginIndex: originIndex,
      targetStackId: targetStackId,
      targetIndex: targetStack.cards.length
    }
  } else {
    //we have a card on top
    if (lastCard.rank - 1 === sourceCard.rank &&
      lastCard.color != sourceCard.color) {
      result = {
        isMoveValid: true,
        originStackId: sourceStackId,
        OriginIndex: originIndex,
        targetStackId: targetStackId,
        targetIndex: targetStack.cards.length
      }
    } else {
      //cannot move here
      result = {
        isMoveValid: false
      }
    }
  }

  return result
}

function handelFreeStackLogic(StackDic, sourceCard, sourceStackId, originIndex, targetStackId) {
  let result = {}

  let targetStack = StackDic[targetStackId]
  let lastCard = targetStack.cards[0]

  if (!lastCard) {
    result = {
      isMoveValid: true,
      originStackId: sourceStackId,
      OriginIndex: originIndex,
      targetStackId: targetStackId,
      targetIndex: targetStack.cards.length
    }
  } else {
    //we have a card already, sorry
    result = {
      isMoveValid: false
    }
  }

  return result
}

function handelFoundationStackLogic(StackDic, sourceCard, sourceStackId, originIndex, targetStackId, targetLimitSuite) {
  let result = {}

  let targetStack = StackDic[targetStackId]
  let lastCard = null
  if (targetStack.cards.length > 0) {
    lastCard = targetStack.cards[targetStack.cards.length - 1]
  }

  if (targetLimitSuite !== sourceCard.suite) {
    result = {
      isMoveValid: false
    }
  } else if (!lastCard) {

    if (sourceCard.rank === 1) {
      result = {
        isMoveValid: true,
        originStackId: sourceStackId,
        OriginIndex: originIndex,
        targetStackId: targetStackId,
        targetIndex: targetStack.cards.length
      }
    } else {
      result = {
        isMoveValid: false
      }
    }
  } else {
    //we have a card on top
    if (lastCard.rank + 1 === sourceCard.rank) {
      result = {
        isMoveValid: true,
        originStackId: sourceStackId,
        OriginIndex: originIndex,
        targetStackId: targetStackId,
        targetIndex: targetStack.cards.length
      }
    } else {
      //cannot move here
      result = {
        isMoveValid: false
      }
    }
  }

  return result
}


export function helperCanMoveCardFromTableau(StackDic, card, stackId, index) {
  if (stackId.includes('t') && StackDic[stackId].cards.length - 1 === index) {
    return true
  } else {
    return false
  }
}

export function determineValidMove(StackDic, sourceCard, sourceStackId, originIndex, targetStackId, targetLimitSuite) {
  let result = {isMoveValid: false}

  if (sourceStackId === targetStackId) {
    result = {
      isMoveValid: false
    }
  } else if (targetStackId.includes('t')) {
    result = handelTableauLogic(StackDic, sourceCard, sourceStackId, originIndex, targetStackId)

  } else if (targetStackId.includes('free')) {
    result = handelFreeStackLogic(StackDic, sourceCard, sourceStackId, originIndex, targetStackId)
  } else if (targetStackId.includes('f')) {
    result = handelFoundationStackLogic(StackDic, sourceCard, sourceStackId, originIndex, targetStackId,targetLimitSuite)
    //note optimization to check only if a valid move into foundation was made
    result.runWinLogic = true;
  } else {
    //we have an error , we have a targetStackId which is not expected
  }

  return result
}

export function checkForWinCondition(StackDic) {
  let isWin = true;
  for(let i=1;(i<5 && isWin);i++){
    let foundationStack = StackDic["f"+i]
    // win condition we must have 13 cards in evey foundation stack
    //we do not check if we meet one stack with less then 13
    if(foundationStack.cards.length<13){
      isWin = false
    }
  }

  return isWin;
}
