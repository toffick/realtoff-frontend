/* eslint-disable no-undef */
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';

import config from '../config';

import { LOCAL_STORAGE_PATHS } from '../constants/GlobalConstants';

class ApiService {

	constructor() {
		this.tokenIsUpdating = false;
		this.tokenUpdatingPromise = Promise.resolve();
		this.offsetSeconds = 60;

		this.apiUrl = config.API_URL;
	}

	/**
	 *
	 * @param email
	 * @param password
	 * @param nickname
	 * @returns {AxiosPromise<any>}
	 */
	signUp(email, password, nickname) {
		return axios.request({
			method: 'POST',
			url: `${this.apiUrl}/api/v1/sign-up`,
			data: {
				email,
				password,
				nickname,
			},
		});
	}

	/**
	 *
	 * @param firstName
	 * @param telephoneNumber
	 * @param isPersonalLessor
	 * @returns {AxiosPromise<any>}
	 */
	setPersonalInfo(firstName, telephoneNumber, isPersonalLessor) {
		return axios.request({
			method: 'POST',
			url: `${this.apiUrl}/api/v1/sign-up/continue`,
			data: {
				first_name: firstName,
				telephone_number: telephoneNumber,
				is_personal_lessor: isPersonalLessor,
			},
			enableAuthorizationHeader: true,
		});
	}


	/**
	 *
     * @param email
     * @param password
     * @returns {Promise<*>}
     */
	signIn(email, password) {
		return axios.request({
			method: 'POST',
			url: `${this.apiUrl}/api/v1/sign-in`,
			data: {
				email,
				password,
			},
		});
	}

	/**
	 *
     * @param accessToken
     * @param refreshToken
     * @returns {Promise<*>}
     */
	signOut({ accessToken, refreshToken }) {
		return this.createRequest({
			method: 'POST',
			url: `${this.apiUrl}/api/v1/sign-out`,
			data: {
				access_token: accessToken,
				refresh_token: refreshToken,
			},
		});
	}

	auth() {
		return this.createRequest({
			method: 'POST',
			url: `${this.apiUrl}/api/v1/auth`,
			data: {},
			enableAuthorizationHeader: true,
		});
	}

	createOffer(offerData) {
		return this.createRequest({
			method: 'POST',
			url: `${this.apiUrl}/api/v1/create-offer`,
			data: {
				...offerData
			},
			enableAuthorizationHeader: true,
		});
	}

	/**
     *
     * @param requestData
     * @param userData
     * @private
     * @return {Promise<*>}
     */
	createRequest(requestData) {
		const accessToken = localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);
		const refreshToken = localStorage.getItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE);

		if (accessToken && refreshToken && requestData.enableAuthorizationHeader) {

			if (this.tokenIsUpdating) {
				return this.tokenUpdatingPromise.then(() => {

					requestData.headers = {
						Authorization: localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE),
					};

					return axios.request(requestData);
				});
			}
			const decodedAccessToken = jsonwebtoken.decode(accessToken.replace('JWT ', ''));
			const decodedRefreshToken = jsonwebtoken.decode(refreshToken.replace('JWT ', ''));
			const expirationAccessTokenLeft = (decodedAccessToken.exp * 1000) - Date.now();
			const expirationRefreshTokenLeft = (decodedRefreshToken.exp * 1000) - Date.now();

			if ((expirationRefreshTokenLeft > 0 && expirationRefreshTokenLeft < this.offsetSeconds * 1000) || expirationRefreshTokenLeft <= 0) {
				return Promise.reject();
			}

			if ((expirationAccessTokenLeft > 0 && expirationAccessTokenLeft < this.offsetSeconds * 1000) || expirationAccessTokenLeft <= 0) {

				this.tokenUpdatingPromise = new Promise((resolve, reject) => this.refreshTokens(localStorage.getItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE))
					.then((response) => {
						localStorage.setItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE, response.data.refresh_token);
						localStorage.setItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE, response.data.access_token);

						return axios.request({
							method: 'POST',
							url: `${this.apiUrl}/api/v1/auth`,
							data: {},
							enableAuthorizationHeader: true,
							headers: {
								Authorization: localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE),
							},
						}).then((result) => {

							this.tokenIsUpdating = false;

							result.data.refresh_token = localStorage.getItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE);
							result.data.access_token = localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);

							return resolve(result.data);

						}).catch(() => {
							this.tokenIsUpdating = false;
							return reject();
						});

					}).catch(reject));

				this.tokenIsUpdating = true;

				return this.tokenUpdatingPromise.then(() => {

					if (requestData.enableAuthorizationHeader) {

						requestData.headers = {
							Authorization: localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE),
						};

					}

					return axios.request(requestData);
				});

			}

			if (requestData.enableAuthorizationHeader) { // TODO::refactor
				requestData.headers = {
					Authorization: localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE),
				};

			}

			return axios.request(requestData);
		}

		return axios.request(requestData);
	}

	/**
     *
     * @param {String} refreshToken
     * @private
     * @return {any}
     */
	refreshTokens(refreshToken) {
		return axios.request({
			method: 'POST',
			withCredentials: true,
			url: `${this.apiUrl}/api/v1/refresh-tokens`,
			data: {
				refresh_token: refreshToken,
			},
		});
	}

}

export default new ApiService();
