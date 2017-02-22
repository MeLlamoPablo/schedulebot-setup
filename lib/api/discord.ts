import * as express from "express";
import {getClientDetails, getUserDetails, getChannelDetails} from "../modules/discord/index";

let router = express.Router();

/**
 * @api {post} /discord/bot/details Request details for a bot
 *
 * @apiParam {string} token The bot's user token.
 *
 * @apiSuccess {string} username The bot's username.
 * @apiSuccess {string} avatar The bot's avatar URL.
 *
 * @apiError (401) Returns 401 if the token is invalid.
 */
router.post("/bot/details", async (req, res, next) => {
	try {

		let details = await getClientDetails(req.body.token);

		if (details !== null) {
			res.status(200).send(JSON.stringify(details));
		} else {
			res.status(401).send();
		}


	} catch (e) {
		next(e);
	}
});

/**
 * @api {post} /discord/user/:id Request details for an user
 *
 * @apiParam {string} token The bot's user token.
 * @apiParam {string} id The user's ID
 *
 * @apiSuccess {string} username The user's username.
 * @apiSuccess {string} avatar The user's avatar URL.
 *
 * @apiError (401) Returns 401 if the token is invalid.
 * @apiError (404) Returns 404 if the user ID is invalid.
 */
router.post("/user/:id", async (req, res, next) => {
	try {

		let details = await getUserDetails(req.body.token, req.params.id);
		res.status(200).send(JSON.stringify(details));

	} catch (e) {

		if (e.message === "Incorrect login details were provided.") {
			res.status(401).send();
		} else if (e.statusCode === 404) {
			res.status(404).send();
		} else {
			next(e);
		}
	}
});

/**
 * @api {post} /discord/channel/:id
 *
 * @apiParam {string} token The bot's user token.
 * @apiParam {string} id The channel's ID
 *
 * @apiSuccess {string} name The channel's name
 * @apiSuccess {string} id The channel's ID
 * @apiSuccess {string} server The channel's server
 *
 * @apiError (401) Returns 401 if the token is invalid.
 * @apiError (404) Returns 404 if the channel ID is invalid or inaccessible to the bot.
 */
router.post("/channel/:id", async (req, res, next) => {
	try {

		let details = await getChannelDetails(req.body.token, req.params.id);

		if (details !== null) {
			res.status(200).send(JSON.stringify(details));
		} else {
			res.status(404).send();
		}

	} catch (e) {
		if (e.message === "Incorrect login details were provided.") {
			res.status(401).send();
		} else {
			next(e);
		}
	}
});

export { router as discord };