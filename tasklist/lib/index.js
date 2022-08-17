"use strict";
/**
 *  better-tasklist.js (or ts) by Babah Gee.
 *
 *  A simple, lightweight and ready-to-use tasklist wrapper to handle Windows processes.
 *	Inspired by the original NPM package named 'tasklist'.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionResult = void 0;
const getAllProcesses_1 = require("./processes/getAllProcesses");
const killProcess_1 = require("./processes/killProcess");
// ============== Main default namespace ==============
var tasklist;
(function (tasklist) {
    tasklist.fetchAllProcesses = getAllProcesses_1._fetchProcesses;
    tasklist.filterFetchedProcesses = getAllProcesses_1._filterFetchedProcesses;
    tasklist.killProcessByPID = killProcess_1._killProcessByPID;
})(tasklist || (tasklist = {}));
var killProcess_2 = require("./processes/killProcess");
Object.defineProperty(exports, "ExecutionResult", { enumerable: true, get: function () { return killProcess_2.ExecutionResult; } });
exports.default = tasklist;
