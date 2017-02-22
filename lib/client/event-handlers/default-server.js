"use strict";

module.exports = () => {

	let val = $("#settings-default-server").find(":selected").text();

	let settings = JSON.parse(localStorage.getItem("settings") || "{}");
	settings["default-server"] = val;
	localStorage.setItem("settings", JSON.stringify(settings));

};