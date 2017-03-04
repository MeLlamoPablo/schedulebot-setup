/// <reference path="../typings/index.d.ts" />
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import {routes} from "./routes";
import {api} from "./api";
import errorHandling from "./middleware/errorHandling";
import PugData from "./modules/pug-data-generator";
import {ExistingData} from "./structures/ExistingData";
import {checkForUpdates} from "./modules/github/checkForUpdates";

export let callback: any;
export let existingData: ExistingData;

let app = express();

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandling);

app.use("/", routes);
app.use("/api/v1", api);

// 404 Fallback
app.use((req, res, next) => {
	res.status(404).render("404", PugData.get({
		title: "404"
	}));
});

export function run(port: number = 3000, data: ExistingData = {}) {
	return new Promise((fulfill, reject) => {
		callback = fulfill;
		existingData = data;

		checkForUpdates().then(newVersion => {
			if (newVersion !== null) {
				existingData.newVersion = newVersion.version
			}

			app.listen(port, () => {
				console.log("The Setup server is live on port " + port);
			});
		}).catch(reject);
	});
}
