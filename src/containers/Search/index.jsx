import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import scrollToComponent from 'react-scroll-to-component';

import SearchingForm from './Form';
import SearchMap from '../../components/Maps/Search';
import OfferPreview from '../../components/OfferPreview';

import Actions from '../../actions';
import { ROUTER_PATHS } from '../../constants/GlobalConstants';

class Index extends React.Component {

	anchorsMap = {}

	componentDidMount() {
		this.props.updateAvailableCountriesRequest();
		if (this.props.location.search.length) {
			const queryObject = qs.parse(this.props.location.search.substr(1));
			this.props.startWithQuery(queryObject);
		}

	}

	componentWillUnmount() {
		this.props.clearSearchPage();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.queryUri !== nextProps.queryUri) {
			this.props.history.replace({ search: nextProps.queryUri });
		}
	}

	onMapInitHandler = () => {
		this.props.changeMapState(true);
	}

	onSelectOfferHandler = (offerId) => {
		scrollToComponent(this.anchorsMap[offerId], {
			offset: 0, align: 'middle', duration: 500, ease: 'inCirc',
		});
		this.props.setSelectedOfferId(offerId);
	}

	render() {
		const {
			mapMeta, offers, selectedOfferId, queryUri,
		} = this.props;

		return (
			<div className="search wrapper" >
				<div className="form-map-wrapper" >
					<SearchingForm />
					<div className="search-map">
						<SearchMap
							queryUri={queryUri}
							location={mapMeta}
							offers={offers}
							onInit={this.onMapInitHandler}
							onSelectOffer={this.onSelectOfferHandler}
						/>
					</div>
				</div>
				<div className="results-wrapper">
					{
						this.props.offers.map((item) =>
							(
								<div
									className="offer-preview-wrapper"
									ref={(ref) => {
										this.anchorsMap[item.id] = ref;
									}}
								>
									<NavLink to={`${ROUTER_PATHS.OFFER}/${item.id}`} className="offer-link">
										<OfferPreview offer={item} isActive={selectedOfferId === item.id} />
									</NavLink>
								</div>
							))
					}
				</div>
			</div>
		);
	}

}

Index.propTypes = {
	selectedOfferId: PropTypes.number,
	mapMeta: PropTypes.object,
	offers: PropTypes.array,
	queryUri: PropTypes.string,
	changeSearchMapState: PropTypes.func.isRequired,
	startWithQuery: PropTypes.func.isRequired,
	clearSearchPage: PropTypes.func.isRequired,
	setSelectedOfferId: PropTypes.func.isRequired,
};

Index.defaultProps = {
	selectedOfferId: null,
	mapMeta: {},
	offers: [],
	queryUri: '',
};

export default connect(
	(state) => ({
		mapMeta: state.search.get('mapMeta'),
		selectedOfferId: state.search.get('selectedOfferId'),
		offers: state.search.get('offers'),
		queryUri: state.search.get('queryUri'),
	}),
	(dispatch) => ({
		updateAvailableCountriesRequest: () => dispatch(Actions.search.updateAvailableCountriesRequest()),
		startWithQuery: (queryObject) => dispatch(Actions.search.startWithQuery(queryObject)),
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		setCity: (city) => dispatch(Actions.search.setCity(city)),
		changeMapState: (state) => dispatch(Actions.search.changeMapState(state)),
		clearSearchPage: () => dispatch(Actions.search.clearSearchPage()),
		setSelectedOfferId: (offerId) => dispatch(Actions.search.setSelectedOfferId(offerId)),
		navigateTo: (options) => dispatch(Actions.navigate.navigateTo(options)),
	}),
)(Index);
