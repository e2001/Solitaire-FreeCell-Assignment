import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import {actionNotFoundMiddleware} from "../utils/actionNotFoundMiddleware"
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./root-saga"

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware,logger,actionNotFoundMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


