"use strict";

const onCheckboxChecked = require("../event-handlers/checkbox")
	, enableNextButton  = require("./enableNextButton")
	, renderSteamBots   = require("./steamBotsManager").renderBots;

module.exports = () => {
	// If the server passed existing data, add it to the local storage
	let existingDataSpan = $("#existing-data");
	let existingData = existingDataSpan.text();

	if (existingData && localStorage.getItem("dont-use-existing-data") !== "true") {

		let data = JSON.parse(existingData);

		if (data.discord) {
			if (data.discord.admin) {
				if (data.discord.admin.id) {
					localStorage.setItem("discord-admin-id", data.discord.admin.id);
				}

				if (data.discord.admin.username) {
					localStorage.setItem("discord-admin-username", data.discord.admin.username);
				}
			}

			if (data.discord.bot) {
				if (data.discord.bot.token) {
					localStorage.setItem("discord-bot-TOKEN", data.discord.bot.token);
				}

				if (data.discord.bot.username) {
					localStorage.setItem("discord-bot-username", data.discord.bot.username);
				}

				if (data.discord.bot.id) {
					localStorage.setItem("discord-bot-id", data.discord.bot.id);
				}
			}
		}

		if (data.settings) {
			localStorage.setItem("settings", JSON.stringify(data.settings));
		}

		if (data.steamBots) {
			localStorage.setItem("steam-bots", JSON.stringify(data.steamBots));
		}

		if (data.newVersion) {
			$("#span-new-version").html(data.newVersion);
			$("#new-version-modal").modal("open");
		}

		// So that the user can reload without the existing data overwriting changes
		localStorage.setItem("dont-use-existing-data", "true");

		existingDataSpan.remove();
	}

	// Bot TOKEN section
	let token = localStorage.getItem("discord-bot-TOKEN");
	if (token) {
		$("#input-discord-TOKEN").val(token);
		enableNextButton("bot-account");
	}

	// Bot admin section
	let adminId = localStorage.getItem("discord-admin-id");
	if (adminId) {
		$("#input-discord-admin-id").val(adminId);
		enableNextButton("bot-admin");
	}

	// Config section
	let settings = JSON.parse(localStorage.getItem("settings") || "{}");
	let settingsDefaults = Object.assign({

		"name": "ScheduleBot",
		"default-timezone": "Europe/Madrid",
		"time-format": "DD/MM/YYYY HH:mm",
		"admin-app-prefix": "schedulebot-admin",
		"delete-after-reply-time": 60,
		"quick-inhouse-command-name": "quick-inhouse",
		"quick-inhouse-event-name": "Inhouse",
		"game-generic-name": "Inhouse",
		"update-interval": 30,
		"mmr-update-interval": 8

	}, settings);

	for (let setting in settingsDefaults) {
		let input = $(`#input-settings-${setting}`);

		if (input.is("[type='checkbox']")) {
			input.prop("checked", settingsDefaults[setting]);

			// Manually call the checkbox event so that hidden content is shown
			onCheckboxChecked({ checkbox: setting });
		} else {
			input.val(settingsDefaults[setting]);
		}
	}

	let botID = localStorage.getItem("discord-bot-id");
	if (botID && !settings["prefix"]) {
		$("#input-settings-prefix").val(`<@${botID}>`);

		$("#input-settings-readable-prefix").val(
			`@${localStorage.getItem("discord-bot-username").match(/(.+)#[0-9]+/)[1]}`
		);
	}

	if (settings["master-channel"]) {
		let masterChannelInput = $("#input-settings-master-channel");

		masterChannelInput.val(settings["master-channel"]);
		masterChannelInput.removeClass("invalid");
	}

	if (settings["default-server"]) {
		let defaultServerSelect = $("#settings-default-server");

		defaultServerSelect.find(":selected").removeAttr("selected");
		defaultServerSelect.val(settings["default-server"]);
		defaultServerSelect.material_select();
	} else {
		let localStorageSettings = JSON.parse(localStorage.getItem("settings") || "{}");
		localStorageSettings["default-server"] = "Luxembourg";
		localStorage.setItem("settings", JSON.stringify(localStorageSettings));
	}

	// Steam bots section
	renderSteamBots();
};