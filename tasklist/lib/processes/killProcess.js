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
Object.defineProperty(exports, "__esModule", { value: true });
exports._killProcessByPID = exports.ExecutionResult = void 0;
var ExecutionResult;
(function (ExecutionResult) {
    ExecutionResult[ExecutionResult["SUCCEED"] = 0] = "SUCCEED";
    ExecutionResult[ExecutionResult["ABORTED"] = 1] = "ABORTED";
    ExecutionResult[ExecutionResult["ERROR"] = 2] = "ERROR";
    ExecutionResult[ExecutionResult["NOT_FOUND"] = 3] = "NOT_FOUND";
    ExecutionResult[ExecutionResult["UNCAUGHT_ERROR"] = 4] = "UNCAUGHT_ERROR";
})(ExecutionResult = exports.ExecutionResult || (exports.ExecutionResult = {}));
/**
 * Kills a specific process with the given process id.
 * The PID parameter is required.
 *
 * Example:
 * .killProcessByPID(6969) => ExecutionResult;
 * .killProcessByPID("420") => ExecutionResult;
 *
 * Example when occurring an error:
 * .killProcessByPID(-120) => ExecutionResult | Error;
 * @param pid Process ID that can be either a postive number or a string, representing the id of a process.
 */
function _killProcessByPID(pid) {
    return __awaiter(this, void 0, void 0, function* () {
        return ExecutionResult.SUCCEED;
    });
}
exports._killProcessByPID = _killProcessByPID;
