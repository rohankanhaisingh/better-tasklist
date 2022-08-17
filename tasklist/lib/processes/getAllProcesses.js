"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._ProcessWrapper = exports._fetchProcesses = exports._filterFetchedProcesses = void 0;
const node_child_process_1 = __importDefault(require("node:child_process"));
const csv_parse_1 = require("csv-parse");
// ============= Private functions =============
function loadTasklist(options, events) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(events);
        return new Promise(function (resolve, reject) {
            var _a, _b;
            const taskDetails = {
                started: Date.now(),
                ended: null,
                taskPid: null,
                receivedBytes: 0,
                results: null
            };
            const task = node_child_process_1.default.exec(`tasklist /fo csv ${typeof options.verbose === "boolean" ? "/v" : ""}`, function (err, stdout, stderr) {
                if (err !== null)
                    return reject(err.message);
                if (stdout !== null) {
                    taskDetails.results = stdout;
                    resolve(stdout);
                }
            });
            taskDetails.taskPid = task.pid;
            (_a = task.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (buffer) {
                const outputBuffer = new Buffer(buffer.toString());
                const bufferLength = outputBuffer.byteLength;
                if (taskDetails.receivedBytes !== null)
                    taskDetails.receivedBytes += parseInt(bufferLength);
                if (typeof events.data === "function")
                    events.data(buffer, taskDetails);
            });
            (_b = task.stdout) === null || _b === void 0 ? void 0 : _b.on("end", function () {
                if (typeof events.end === "function")
                    events.end(taskDetails);
            });
        });
    });
}
function clearOutput(input) {
    const output = input.split("\n");
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        if (line === undefined)
            output.splice(i, 1);
    }
    return output.join("\n");
}
function getTasklistHeaders(type) {
    switch (type) {
        case "default":
            return ["imageName", "pid", "sessionName", "sessionNumber", "memUsage"];
            break;
        case "verbose":
            return ['imageName', 'pid', 'sessionName', 'sessionNumber', 'memUsage', 'status', 'username', 'cpuTime', 'windowTitle'];
            break;
    }
}
function parseOutputContent(input, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasklistHeaders = getTasklistHeaders(typeof options.verbose === "boolean" ? "verbose" : "default");
        const parser = (0, csv_parse_1.parse)({ columns: tasklistHeaders });
        const data = [];
        const prom = new Promise(function (resolve, reject) {
            parser.on("data", function (chunk) {
                data.push(chunk);
            });
            parser.on("error", function (err) {
                reject(err);
            });
            parser.on("end", function () {
                resolve(data);
            });
        });
        parser.write(clearOutput(input), "utf-8");
        setTimeout(function () {
            parser.end();
        }, typeof options.timeout === "number" ? options.timeout : 1000);
        return prom;
    });
}
function filterObjectByImageName(obj, imageName) {
    const objImageName = obj.imageName;
    if (imageName === null)
        return false;
    if (objImageName === imageName)
        return true;
    return false;
}
// ============= Public functions =============
/**
 * Filters the fetched list of processes, returning specific results to handle with.
 * The filter parameter is required.
 *
 * Example:
 * .filterFetchedProcesses(myFetchedProcesses, {
 *		imageName: "svchost.exe"
 * }) => IEnumeratedProcesses<FetchedProcess>;
 *
 * @param fetchedProcesses Array (IEnumeratedProcesses) with fetch proccess to filter.
 * @param filter Filter methods.
 */
function _filterFetchedProcesses(fetchedProcesses, filter) {
    const filteredProcesses = [];
    for (let i = 0; i < fetchedProcesses.length; i++) {
        const p = fetchedProcesses[i];
        if (filterObjectByImageName(p, typeof filter.imageName === "string" ? filter.imageName : null))
            filteredProcesses.push(p);
    }
    return filteredProcesses;
}
exports._filterFetchedProcesses = _filterFetchedProcesses;
/**
 * Fetches all running processes (tasks) and returns an array with the data included. The options are optional.
 *
 * Example:
 * .fetchAllProcesses() => Array<FetchedProcess>;
 * @param options
 */
function _fetchProcesses(options, events) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasklistOutput = yield loadTasklist(Object.assign({}, options), Object.assign({}, events));
        const parsedProcesses = yield parseOutputContent(tasklistOutput, Object.assign({}, options));
        return [...parsedProcesses];
    });
}
exports._fetchProcesses = _fetchProcesses;
class _ProcessWrapper {
    constructor(fetchedProcess) {
    }
    KillProcess() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports._ProcessWrapper = _ProcessWrapper;
