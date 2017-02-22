"use strict";
var _ = require("lodash");
var PugDataGenerator = (function () {
    function PugDataGenerator() {
        this.defaultData = {};
        if (PugDataGenerator._instance) {
            throw new Error("Already instantiated.");
        }
        this.initializeDefaults();
        PugDataGenerator._instance = this;
    }
    PugDataGenerator.prototype.initializeDefaults = function () {
        this.defaultData = {
            nav: {
                title: "ScheduleBot Setup"
            },
            menu: [
                {
                    name: "Introduction"
                },
                {
                    name: "Bot account",
                    preventNext: true
                },
                {
                    name: "Bot admin",
                    preventNext: true
                },
                {
                    name: "Bot settings",
                    preventNext: true
                },
                {
                    name: "Steam accounts",
                    preventNext: true
                },
                {
                    name: "Finish"
                }
            ]
        };
        for (var _i = 0, _a = this.defaultData.menu; _i < _a.length; _i++) {
            var item = _a[_i];
            item.id = _.kebabCase(item.name);
        }
    };
    PugDataGenerator.getInstance = function () {
        return PugDataGenerator._instance;
    };
    PugDataGenerator.prototype.getDefaultData = function () {
        return Object.create(this.defaultData);
    };
    PugDataGenerator.get = function (input) {
        var generator = PugDataGenerator.getInstance();
        return Object.assign(generator.getDefaultData(), input);
    };
    return PugDataGenerator;
}());
PugDataGenerator._instance = new PugDataGenerator();
exports.__esModule = true;
exports["default"] = PugDataGenerator;
