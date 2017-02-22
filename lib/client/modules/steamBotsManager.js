"use strict";

const enableNextButton  = require("./enableNextButton")
	, disableNextButton = require("./disableNextButton");

/**
 * @param {number} botID The index of the bot in the bot array.
 * @param {SteamBot} bot
 * @return {Element}
 */
function renderBot(botID, bot) {

	let li = document.createElement("li");
	li.className = "collection-item";

	let div = document.createElement("div");

	let span = document.createElement("span");
	span.innerHTML = `<strong>Bot #${botID + 1}</strong>: ${bot.username}`;
	div.appendChild(span);

	let a = document.createElement("a");
	a.setAttribute("href", "#"); // So that it shows the click cursor
	a.className = "steam-bot-delete secondary-content";
	a.onclick = event => {
		let targetBot = +$(event.currentTarget).attr("data-bot-id");
		deleteBot(targetBot);
	};

	let i = document.createElement("i");
	i.className = "material-icons";
	i.setAttribute("style", "color: #B71C1C !important;"); // red darken-4
	i.appendChild(document.createTextNode("delete"));

	a.appendChild(i);
	a.setAttribute("data-bot-id", botID);

	div.appendChild(a);

	li.appendChild(div);

	return li;

}

/**
 * @param {SteamBot[]} [bots]
 */
function renderBots(bots = getBots()) {

	let collection = $("#collection-steam-bots");

	collection.html("");

	for (let i = 0; i < bots.length; i++) {
		collection.append(renderBot(i, bots[i]));
	}

	if (bots.length) {
		enableNextButton("steam-accounts");
	} else {
		disableNextButton("steam-accounts");
	}

}

/**
 * @param {SteamBot} bot
 */
function addBot(bot) {

	let bots = getBots();
	bots.push(bot);
	_saveBots(bots);
	renderBots(bots);

}

/**
 * @param {number} botID
 */
function deleteBot(botID) {

	let bots = getBots();
	bots.splice(botID, 1);
	renderBots(bots);
	_saveBots(bots);

}

/**
 * @return {SteamBot[]}
 */
function getBots() {
	return JSON.parse(localStorage.getItem("steam-bots") || "[]");
}

/**
 * @private
 * @param {SteamBot[]} bots
 */
function _saveBots(bots) {
	localStorage.setItem("steam-bots", JSON.stringify(bots));
}

module.exports = { renderBots, addBot, deleteBot };

/**
 * @typedef {object} SteamBot
 * @property {string} username
 * @property {string} password
 * @property {boolean} steamGuardEnabled
 * @property {string} [steamGuardCode]
 */