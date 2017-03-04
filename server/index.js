"use strict";
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var routes_1 = require("./routes");
var api_1 = require("./api");
var errorHandling_1 = require("./middleware/errorHandling");
var pug_data_generator_1 = require("./modules/pug-data-generator");
var checkForUpdates_1 = require("./modules/github/checkForUpdates");
var app = express();
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandling_1.default);
app.use("/", routes_1.routes);
app.use("/api/v1", api_1.api);
app.use(function (req, res, next) {
    res.status(404).render("404", pug_data_generator_1.default.get({
        title: "404"
    }));
});
function run(port, data) {
    if (port === void 0) { port = 3000; }
    if (data === void 0) { data = {}; }
    return new Promise(function (fulfill, reject) {
        exports.callback = fulfill;
        exports.existingData = data;
        checkForUpdates_1.checkForUpdates().then(function (newVersion) {
            if (newVersion !== null) {
                exports.existingData.newVersion = newVersion.version;
            }
            app.listen(port, function () {
                console.log("The Setup server is live on port " + port);
            });
        }).catch(reject);
    });
}
exports.run = run;
