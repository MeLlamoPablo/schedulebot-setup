"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var semver = require("semver");
var request = require("request-promise");
var _1 = require("../../");
var API_URL = "https://api.github.com/repos/MeLlamoPablo/schedulebot/releases/latest";
var Version = (function () {
    function Version(version) {
        this.setVersion(version);
    }
    Object.defineProperty(Version.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    Version.prototype.setVersion = function (version) {
        var versionToSet = version.replace("-dota", "");
        if (semver.valid(versionToSet) !== null) {
            this._version = versionToSet;
        }
        else {
            throw new Error("Version " + version + " is not a valid semver version.");
        }
    };
    Version.getLatest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request({
                            uri: API_URL,
                            headers: {
                                "User-Agent": "MeLlamoPablo/schedulebot"
                            },
                            method: "GET",
                            json: true
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new Version(response.tag_name)];
                }
            });
        });
    };
    Version.getCurrent = function () {
        if (_1.existingData.currentVersion) {
            return new Version(_1.existingData.currentVersion);
        }
        else {
            return null;
        }
    };
    Version.prototype.compareTo = function (aVersion) {
        switch (semver.compare(this.version, aVersion.version)) {
            case 1: return EVersionCompareResult.GREATER;
            case 0: return EVersionCompareResult.EQUAL;
            case -1: return EVersionCompareResult.LESS;
            default: throw new Error("This shouldn't happen.");
        }
    };
    return Version;
}());
exports.Version = Version;
var EVersionCompareResult;
(function (EVersionCompareResult) {
    EVersionCompareResult[EVersionCompareResult["GREATER"] = 1] = "GREATER";
    EVersionCompareResult[EVersionCompareResult["EQUAL"] = 0] = "EQUAL";
    EVersionCompareResult[EVersionCompareResult["LESS"] = -1] = "LESS";
})(EVersionCompareResult = exports.EVersionCompareResult || (exports.EVersionCompareResult = {}));
