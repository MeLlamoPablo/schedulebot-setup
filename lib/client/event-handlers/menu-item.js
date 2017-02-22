"use strict";

const getMenu     = require("../modules/getMenu")
	, loadSection = require("../modules/loadSection");

module.exports = event => {
	let target = $(event.target).attr("id").replace("menu-item-", "");
	let menu = getMenu();

	// Don't let the user access a section if a previous one has "prevent-next" set to true
	let prevent = (() => {
		for (let i = 0, index = menu.indexOf(target); i < index; i++) {
			let section = $(`#menu-item-${menu[i]}`);

			if (section.attr("data-prevent-next") === "true") {
				return true;
			}
		}

		return false;
	})();

	if (!prevent) {
		loadSection(target);
	} else {
		Materialize.toast("Please complete the previous steps before!", 5000);
	}

};