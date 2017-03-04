import * as express from "express";
import {discord} from "./discord";
import {callback, existingData} from "../";
import {setApiKey, EHerokuSetApiKeyResult} from "../modules/heroku/index";

let router = express.Router();

router.use("/discord", discord);

router.post("/deploy", async (req, res, next) => {
	try {

		let result = JSON.parse(req.body.data);

		if (result) {
			res.status(200).send({
				success: true
			});

			if (result.heroku && existingData.heroku) {
				result.heroku.key = existingData.heroku.key;
			}

			callback({ action: "setup", data: result });
		} else {
			res.status(400).send();
		}

	} catch (e) {
		next(e);
	}
});

router.post("/update", async (req, res, next) => {
	callback({ action: "update", data: existingData });

	res.status(200).send();
});

router.post("/apikey", async (req, res, next) => {
	try {

		let result = await setApiKey(req.body.app, req.body.key);

		switch (result) {
			case EHerokuSetApiKeyResult.SUCCESS:
				if (existingData && existingData.heroku) {
					existingData.heroku.key = req.body.key;
				}

				res.status(204).send();
				break;

			case EHerokuSetApiKeyResult.WRONG_KEY:
				res.status(401).send();
				break;

			case EHerokuSetApiKeyResult.WRONG_APP_NAME:
				// Shouldn't happen if the user is running in blahblah.herokuapp.com
				res.status(500).send();
				break;
		}

	} catch (e) {
		next(e);
	}
});

export { router as api };