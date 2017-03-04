"use strict";

const request = require("request-promise");

const BASE_URL = window.location.origin + "/api/v1";

/**
 * Executes the POST /discord/bot/details method.
 * @param {string} token The bot's TOKEN.
 * @return {Promise<GetClientDetailsResponse|null>} The client details, or null on invalid TOKEN.
 *
 * @typedef {object} GetClientDetailsResponse
 * @property {string} id
 * @property {string} avatar
 * @property {string} username
 */
function getClientDetails(token) {
	return new Promise((fulfill, reject) => {

		request({
			method: "POST",
			uri: BASE_URL + "/discord/bot/details",
			form: {
				token: token
			}
		})
			.then(res => JSON.parse(res))
			.then(fulfill)
			.catch(err => {

				if (err.statusCode === 401) {
					fulfill(null);
				} else {
					reject(err);
				}

			});

	});
}

/**
 * Executes the POST /discord/user/:id method
 * @param {string} token The bot's TOKEN.
 * @param {string} user The requested user's ID.
 * @return {Promise<GetClientDetailsResponse|null>}
 */
function getUserDetails(token, user) {
	return new Promise((fulfill, reject) => {

		request({
			method: "POST",
			uri: BASE_URL + "/discord/user/" + user,
			form: {
				token: token
			}
		})
			.then(res => JSON.parse(res))
			.then(fulfill)
			.catch(err => {

				if (err.statusCode === 401 || err.statusCode === 404) {
					fulfill(null);
				} else {
					reject(err);
				}

			});

	});
}

/**
 * Executes the POST /discord/channel/:id method
 * @param {string} token The bot's TOKEN.
 * @param {string} channel The channel's ID.
 * @return {Promise<GetChannelDetailsResponse|null>}
 *
 * @typedef {object} GetChannelDetailsResponse
 * @property {string} id The channel ID
 * @property {string} name The channel name
 * @property {string} server The ID of the server where the channel belongs
 */
function getChannelDetails(token, channel) {
	return new Promise((fulfill, reject) => {

		request({
			method: "POST",
			uri: BASE_URL + "/discord/channel/" + channel,
			form: {
				token: token
			}
		})
			.then(res => JSON.parse(res))
			.then(fulfill)
			.catch(err => {

				if (err.statusCode === 401 || err.statusCode === 404) {
					fulfill(null);
				} else {
					reject(err);
				}

			});

	});
}

function deploy(payload) {
	return new Promise((fulfill, reject) => {

		request({
			method: "POST",
			uri: BASE_URL + "/deploy",
			form: {
				data: JSON.stringify(payload)
			}
		})
			.then(res => JSON.parse(res))
			.then(fulfill)
			.catch(reject);

	});
}

function update() {
	return request({
		method: "POST",
		uri: BASE_URL + "/update",
	});
}

/**
 * Makes sure that a provided API key is valid, and, if it is, sets it as an app config var.
 *
 * @param {string} appName The user's app name.
 * @param {string} key     The user's API key.
 * @return {Promise<void>}
 */
function setApiKey(appName, key) {
	return new Promise((fulfill, reject) => {

		request({
			method: "POST",
			uri: BASE_URL + "/apikey",
			form: {
				app: appName,
				key: key
			}
		})
			.then(() => fulfill())
			.catch(reject);

	});
}

module.exports = {
	deploy,
	getClientDetails,
	getUserDetails,
	getChannelDetails,
	setApiKey,
	update
};