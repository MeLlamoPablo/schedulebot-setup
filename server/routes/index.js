"use strict";
var express = require("express");
var pug_data_generator_1 = require("../modules/pug-data-generator");
var _1 = require("../");
var router = express.Router();
exports.routes = router;
router.get("/", function (req, res, next) {
    if (_1.existingData &&
        _1.existingData.heroku &&
        _1.existingData.heroku.enabled &&
        !_1.existingData.heroku.key) {
        var data = pug_data_generator_1["default"].get({
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
    else {
        var data = pug_data_generator_1["default"].get({
            title: "ScheduleBot Setup"
        });
        if (Object.getOwnPropertyNames(_1.existingData).length > 0) {
            data.existingData = JSON.stringify(_1.existingData);
        }
        data.view = "main";
        res.render("main", data);
    }
});
