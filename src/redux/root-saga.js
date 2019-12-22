import {all, call} from 'redux-saga/effects'
import {gameSagas} from "./game/game.sagas"


export default function* rootSaga() {
  // Note : when combining a number of child sagas into the root saga , we use the 'all' operator
  // allows to run many sagas in parallel , they do not wait for each other
  yield all(
    [
      call(gameSagas)
    ])
}
