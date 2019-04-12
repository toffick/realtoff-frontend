import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Actions from '../../actions';
import SearchingForm from './Form';
import SearchMap from '../../components/Maps/Search';

class Index extends React.Component {

	componentDidMount() {
		this.props.updateAvailableCountriesRequest();
	}

	render() {
		return (
			<div className="search wrapper">
				<div className="form-map-wrapper">
					<SearchingForm />
					<SearchMap />
				</div>
				<div className="results-wrapper">
					<ul>
						<li>1</li>
						<li>2</li>
					</ul>
				</div>
			</div>
		);
	}

}

Index.propTypes = {
	availableCountries: PropTypes.array,
	availableCities: PropTypes.array,
	country: PropTypes.string,
	city: PropTypes.string,
};

Index.defaultProps = {
	availableCountries: [],
};

export default connect(
	(state) => ({
	}),
	(dispatch) => ({
		updateAvailableCountriesRequest: () => dispatch(Actions.search.updateAvailableCountriesRequest()),
	}),
)(Index);
