import * as Heroku from "heroku-client";

export enum EHerokuSetApiKeyResult {
	SUCCESS = 1,
	WRONG_KEY = 2,
	WRONG_APP_NAME = 3
}

/**
 * Makes sure that a provided API key is valid, and, if it is, sets it as an app config var.
 *
 * @param {string} appName The user's app name.
 * @param {string} key     The user's API key.
 * @return {Promise<EHerokuSetApiKeyResult>}
 */
export async function setApiKey(appName: string, key: string): Promise<EHerokuSetApiKeyResult> {
	try {

		const client = new Heroku({ token: key });

		let app = await client.get(`/apps/${appName}/`);

		await client.patch(`/apps/${app.id}/config-vars`, {
			body: {
				HEROKU_API_KEY: key,
				HEROKU_APP_NAME: appName,
				HEROKU_APP_ID: app.id
			}
		});

		return EHerokuSetApiKeyResult.SUCCESS;

	} catch (e) {

		if (e.statusCode === 401) {
			return EHerokuSetApiKeyResult.WRONG_KEY
		} else if (e.statusCode === 403) {
			return EHerokuSetApiKeyResult.WRONG_APP_NAME
		} else {
			throw e;
		}

	}
}