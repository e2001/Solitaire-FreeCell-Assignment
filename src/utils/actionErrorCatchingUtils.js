import {getTrace} from './getTrace'
import allActions from "./../redux/actions"

export const tryConsoleErrorActionNotFound = (action) => {

  if (action.includes('@@') || action === 'persist/PERSIST'
    || action === 'persist/REHYDRATE') {
    return
  }

  if (!allActions[action]) {
    const trace = getTrace(['tryConsoleErrorActionNotFound'])
    console.error(`action [${action}] not found in entire actions dictionary [${Object.values(allActions)} ] [ trace : ` + trace.toString() + ' ]')
  }

}

export const tryConsoleErrorActionNotHandheld  = (action, dic) => {

  if (action.includes('@@') || action === 'persist/PERSIST'
    || action === 'persist/REHYDRATE'
  || action === 'START_NEW_GAME_REQUESTED'
  || action === 'MOVE_CARD_TO_STACK_REQUESTED'
  || action === 'CARD_TO_FREE_STACK_REQUESTED') {
    return
  }

  if (allActions[action] && dic[action]) {
    const trace = getTrace(['tryConsoleErrorActionNotHandheld'])
    console.error(`action [${action}] not handheld [ trace : ` + trace.toString() + ' ]')
  }


}


