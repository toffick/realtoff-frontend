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
		const {location} = this.props;

		return (
			<div className="search wrapper">
				<div className="form-map-wrapper">
					<SearchingForm />
					<div className="search-map">
						<SearchMap location={location}/>
					</div>
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
	location: PropTypes.object
};

Index.defaultProps = {
};

export default connect(
	(state) => ({
		location: state.search.get('location')
	}),
	(dispatch) => ({
		updateAvailableCountriesRequest: () => dispatch(Actions.search.updateAvailableCountriesRequest()),
	}),
)(Index);
