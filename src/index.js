import 'babel-polyfill';
import './assets/css/main.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from './routes';
import './assets/loader';

import history from './history';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history} store={store}>
			<div>
				<Routes/>
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'),
);
