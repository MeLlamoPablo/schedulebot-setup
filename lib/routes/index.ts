import * as express from "express";
import PugData from "../modules/pug-data-generator";
import {existingData} from "../";

let router = express.Router();

router.get("/", (req, res, next) => {

	if (isHerokuEnabledButKeyNotSet()) {

		renderHerokuKeyDialog(res);

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

router.get("/update", async (req, res, next) => {

	if (isHerokuEnabledButKeyNotSet()) {

		renderHerokuKeyDialog(res);

	} else {

		let data = PugData.get({
			title: "ScheduleBot Update",
			menu: [
				{
					name: "Updating",
					id: "updating"
				}
			],
			newVersionAvailable: !!existingData.newVersion
		});

		if (Object.getOwnPropertyNames(existingData).length > 0) {
			data.existingData = JSON.stringify(existingData);
		}

		data.view = "update";

		res.render("update", data);

	}

});

function isHerokuEnabledButKeyNotSet(): boolean {
	return !!(existingData &&
		existingData.heroku &&
		existingData.heroku.enabled &&
		!existingData.heroku.key);
}

function renderHerokuKeyDialog(res): void {
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
}

export { router as routes };