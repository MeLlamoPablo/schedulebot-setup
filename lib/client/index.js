"use strict";

const initializers = { main: require("./initializers/main"),
	heroku: require("./initializers/heroku"),
	updating: require("./initializers/updating") };

$(document).ready(() => {

	switch($("#data-current-view").text()) {

		case "main":   initializers.main();     break;
		case "heroku": initializers.heroku();   break;
		case "update": initializers.updating(); break;

	}


});