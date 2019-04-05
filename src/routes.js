import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthRoute from './containers/AuthRoute';
import App from './containers/App';
import Index from './containers/Index';
import Login from './containers/Login';
import Register from './containers/Register';
import RegisterContinue from './containers/Register/RegisterContinue';
import CreateOffer from './containers/CreateOffer';
import Profile from './containers/Profile';
import PageNotFound from './containers/PageNotFound';
import Wrapper from './containers/Wrapper';

import { ROUTER_PATHS, CREATE_OFFER_PATHS } from './constants/GlobalConstants';

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
								<Route exact path={ROUTER_PATHS.REGISTER_CONTINUE} component={RegisterContinue} />
								<Route exact path={ROUTER_PATHS.PROFILE} component={Profile} />
								<Route exact path={ROUTER_PATHS.CREATE_OFFER} component={CreateOffer} />
							</Switch>
						</AuthRoute>
						<Route exact path={ROUTER_PATHS.NOT_FOUND} component={PageNotFound} />
						<Route component={PageNotFound} />
					</Switch>
				</App>
			</Wrapper>
		);
	}

}
