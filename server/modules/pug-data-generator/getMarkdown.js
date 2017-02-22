"use strict";
var fs = require("fs");
var path = require("path");
var marked = require("marked");
function getMarkdown(lang) {
    var directory = path.join(__dirname, "../../../content", lang);
    var files = fs.readdirSync(directory);
    var result = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        result.push({
            title: file.replace(".md", ""),
            content: marked(fs.readFileSync(directory + "/" + file, "utf-8"))
        });
    }
    return result;
}
exports.__esModule = true;
exports["default"] = getMarkdown;
