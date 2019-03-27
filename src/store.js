import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import { routerMiddleware, routerReducer } from 'react-router-redux';

import history from './history';
import reducers from './reducers';
import rootSaga from './sagas';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer,
	}), {},
	compose(
		applyMiddleware(sagaMiddleware),
		applyMiddleware(middleware),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f,
	),
);


sagaMiddleware.run(rootSaga);

export default store;
