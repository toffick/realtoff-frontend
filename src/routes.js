import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthRoute from './containers/AuthRoute';
import App from './containers/App';
import Index from './containers/Search';
import Login from './containers/Login';
import Register from './containers/Register';
import RegisterContinue from './containers/Register/RegisterContinue';
import CreateOffer from './containers/CreateOffer';
import Profile from './containers/Profile';
import Offer from './containers/Offer';
import PageNotFound from './components/PageNotFound';
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
						<Route exact path={ROUTER_PATHS.FINISH_REGISTRATION} component={RegisterContinue} />
						<Route path={`${ROUTER_PATHS.OFFERS}/:offerId`} component={Offer} />
						<AuthRoute>
							<Route exact path={ROUTER_PATHS.PROFILE} component={Profile} />
							<Route exact path={ROUTER_PATHS.CREATE_OFFER} component={CreateOffer} />
						</AuthRoute>
						{/* TODO */}
						<Route component={PageNotFound} />
					</Switch>
				</App>
			</Wrapper>
		);
	}

}
