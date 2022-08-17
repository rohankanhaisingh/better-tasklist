"use strict";
exports.__esModule = true;
var index_1 = require("./processes/index");
var tasklist;
(function (tasklist) {
    tasklist.getAllProcesses = index_1._getAllProcesses;
})(tasklist || (tasklist = {}));
exports["default"] = tasklist;
