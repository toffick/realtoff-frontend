import React from 'react';
import { Route, Switch } from 'react-router';

import AuthRoute from './containers/AuthRoute';
import App from './containers/App';
import Index from './containers/Index';
import Login from './containers/Login';
import Register from './containers/Register';
import Profile from './containers/Profile';
import PageNotFound from './containers/PageNotFound';
import Wrapper from './containers/Wrapper';

import { ROUTER_PATHS } from './constants/GlobalConstants';

export default class Routes extends React.Component {

	render() {
		return (
			<Wrapper>
				<App>
					<Switch>
						<Route exact path={ROUTER_PATHS.INDEX} component={Index} />
						<Route exact path={ROUTER_PATHS.LOGIN} component={Login} />
						<Route exact path={ROUTER_PATHS.REGISTER} component={Register} />
						<AuthRoute>
							<Switch>
								<Route exact path={ROUTER_PATHS.PROFILE} component={Profile} />
							</Switch>
						</AuthRoute>
						<Route exact path={ROUTER_PATHS.NOT_FOUND} component={PageNotFound} />
						<Route path="*" component={PageNotFound} />
					</Switch>
				</App>
			</Wrapper>
		);
	}

}
