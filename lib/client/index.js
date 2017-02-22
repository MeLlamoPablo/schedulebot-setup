"use strict";

const initializers = { main: require("./initializers/main"),
	heroku: require("./initializers/heroku") };

$(document).ready(() => {

	switch($("#data-current-view").text()) {

		case "main":   initializers.main();   break;
		case "heroku": initializers.heroku(); break;

	}


});