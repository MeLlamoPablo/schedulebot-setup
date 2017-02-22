"use strict";

module.exports = () => {

	let result = {};

	// Get every valid input that is visible (invisible means that we don't account it).
	for (let input of Array.from($(".settings-input:not(.invalid):visible"))) {
		result[input.id.replace("input-settings-", "")] = input.value;
	}

	for (let input of Array.from($("input[type='checkbox']:visible"))) {
		input = $(input);
		result[input.attr("id").replace("input-settings-", "")] = input.is(":checked");
	}

	// Convert strings to number
	for (let setting of [
		"delete-after-reply-time",
		"mmr-update-interval",
		"update-interval",
		"ticketing-league-id"
	]) {
		result[setting] = +result[setting];
	}

	// Add the master channel
	let masterChannel = $("#input-settings-master-channel").val();
	if (masterChannel) {
		result["master-channel"] = masterChannel;
	}

	localStorage.setItem("settings", JSON.stringify(result))

};

window.saveValidSettings = module.exports;