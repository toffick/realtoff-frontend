import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Index from './containers/Index';
import PageNotFound from './containers/PageNotFound';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route exact path="/" component={Index} />
					<Route component={PageNotFound} />
				</Switch>
			</App>
		);
	}

}
