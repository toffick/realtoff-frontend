import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';

import SearchingForm from './Form';
import SearchMap from '../../components/Maps/Search';

import Actions from '../../actions';

class Index extends React.Component {

	componentDidMount() {
		this.props.updateAvailableCountriesRequest();
		if (this.props.location.search.length) {
			const queryObject = qs.parse(this.props.location.search.substr(1));
			this.props.startWithQuery(queryObject);
		}

	}

	componentWillReceiveProps(nextProps) {
		if (this.props.queryUri !== nextProps.queryUri) {
			this.props.history.replace({ search: nextProps.queryUri });
		}
	}

	onMapInitHandler = () => {
		this.props.changeMapState(true);
	}

	render() {
		const { mapMeta, offers } = this.props;

		return (
			<div className="search wrapper">
				<div className="form-map-wrapper">
					<SearchingForm />
					<div className="search-map">
						<SearchMap
							location={mapMeta}
							offers={offers}
							onInit={this.onMapInitHandler}
						/>
					</div>
				</div>
				<div className="results-wrapper">

					{
						this.props.offers.map((item) =>
							(
								<div>{JSON.stringify(item, null, '\t')} </div>
							))
					}
				</div>
			</div>
		);
	}

}

Index.propTypes = {
	mapMeta: PropTypes.object,
	offers: PropTypes.array,
	queryUri: PropTypes.string,
	changeSearchMapState: PropTypes.func.isRequired,
	startWithQuery: PropTypes.func.isRequired,
};

Index.defaultProps = {
	mapMeta: {},
	offers: [],
	queryUri: '',
};

export default connect(
	(state) => ({
		mapMeta: state.search.get('mapMeta'),
		offers: state.search.get('offers'),
		queryUri: state.search.get('queryUri'),
	}),
	(dispatch) => ({
		updateAvailableCountriesRequest: () => dispatch(Actions.search.updateAvailableCountriesRequest()),
		startWithQuery: (queryObject) => dispatch(Actions.search.startWithQuery(queryObject)),
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		setCity: (city) => dispatch(Actions.search.setCity(city)),
		changeMapState: (state) => dispatch(Actions.search.changeMapState(state)),
	}),
)(Index);
