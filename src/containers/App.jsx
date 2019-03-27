import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toast from '../components/Toast';
import Loading from '../containers/Loading';

class App extends React.Component {

	render() {
		const { children, initInProcess } = this.props;

		if (initInProcess) {
			return <Loading />;
		}

		return (
			<div className="wrapper">
				{children}
				<Toast />
			</div>
		);
	}

}

App.propTypes = {
	initInProcess: PropTypes.bool,
	children: PropTypes.element.isRequired,
};

App.defaultProps = {
	initInProcess: false,
};

export default connect((state) => ({ initInProcess: state.global.get('initRequestStatus') }))(App);
