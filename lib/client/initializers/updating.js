"use strict";

const errorHandler = require("../modules/errorHandler")
	, loadSection  = require("../modules/loadSection")
	, update       = require("../modules/api").update;

module.exports = () => {

	loadSection("updating");

	let existingData = JSON.parse($("#existing-data").text());

	$("#span-current-version").html(existingData.currentVersion);
	$("#span-new-version").html(existingData.newVersion);

	let updateBotButton = $("#button-update-bot");
	updateBotButton.html("Update to v" + existingData.newVersion);
	updateBotButton.click(() => {

		let loading = $("#loading-update-bot");

		updateBotButton.hide();
		loading.show();

		update().then(() => {
			localStorage.clear();
		}).catch(err => {
			loading.hide();
			updateBotButton.show();

			errorHandler(err);
		});
	});

};