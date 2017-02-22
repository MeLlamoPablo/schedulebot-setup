"use strict";

const errorHandler = require("../modules/errorHandler")
	, setApiKey    = require("../modules/api").setApiKey
	, loadSection  = require("../modules/loadSection");

module.exports = () => {

	loadSection("heroku-api-key");

	function onInputChange() {
		$("#button-send-api-key").removeClass("disabled");
	}

	let apiKeyInput = $("#input-api-key");
	apiKeyInput.on("paste", onInputChange);
	apiKeyInput.change(onInputChange);

	$("#button-send-api-key").click(() => {
		let button = $("#button-send-api-key");
		let loading = $("#loading-send-api-key");

		button.hide();
		loading.show();

		let matches = location.host.match(/(.+)\.herokuapp\.com/), appName;

		if (matches) {
			appName = matches[1];
		} else {
			//noinspection JSUnresolvedVariable - for debug purposes only
			appName = window._appName;
		}

		setApiKey(appName, $("#input-api-key").val()).then(() => {

			window.location.reload(true);

		}).catch(err =>  {
			button.show();
			loading.hide();

			if (err.statusCode && err.statusCode === 401) {
				Materialize.toast("The token you entered is not correct!", 5000);
			} else {
				errorHandler(err);
			}
		});

	});

};