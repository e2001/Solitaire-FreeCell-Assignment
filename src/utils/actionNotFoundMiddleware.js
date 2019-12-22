import {tryConsoleErrorActionNotFound} from "./actionErrorCatchingUtils"


export const actionNotFoundMiddleware = store => next => action => {

  tryConsoleErrorActionNotFound(action.type)

  next(action);
}
