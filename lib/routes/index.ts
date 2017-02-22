import * as express from "express";
import PugData from "../modules/pug-data-generator";
import {existingData} from "../";

let router = express.Router();

router.get("/", (req, res, next) => {

	if (
		existingData &&
		existingData.heroku &&
		existingData.heroku.enabled &&
		!existingData.heroku.key) {

		// If we have no heroku key, send the heroku view
		let data = PugData.get({
			title: "Heroku API Key | ScheduleBot Setup",
			menu: [
				{
					name: "Heroku API Key",
					id: "heroku-api-key"
				}
			],
			view: "heroku"
		});

		res.render("heroku", data);


	} else {
		let data = PugData.get({
			title: "ScheduleBot Setup"
		});

		if (Object.getOwnPropertyNames(existingData).length > 0) {
			data.existingData = JSON.stringify(existingData);
		}

		data.view = "main";

		res.render("main", data);
	}

});

export { router as routes };