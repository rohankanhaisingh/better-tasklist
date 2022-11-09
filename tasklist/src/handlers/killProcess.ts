import fs from "node:fs";
import cp, { ExecException } from "node:child_process";
import path from "node:path";
import url from "node:url";
import { parse, Parser } from "csv-parse";
import { stderr } from "node:process";

import { ExecutionSignals } from "../utils/typings";


// =============== Private functions ===============

async function checkProcessExistance(pid: number): Promise<ExecutionSignals> {

	return new Promise(function (resolve, reject) {

		const task = cp.exec(`tasklist /fi "PID eq ${pid}"`, function (err: ExecException | null, stdout: string, stderr: string) {

			if (err) reject(err.message);

			if (stdout !== null) {

				const results = stdout.toLowerCase();

				if (results.startsWith("error") || results.startsWith("info")) resolve(ExecutionSignals.NOT_FOUND);

				resolve(ExecutionSignals.SUCCEED);
			}

			if (stderr !== null) reject(stderr);
		});

	});

}

// =============== Public functions and variables ===============

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
 * @param force Forces to kill a specific process. This is useful when a process has a high priority and can only be closed by either by the user OR forcing to kill it.
 */
export async function _killProcessByPID(pid: string | number, force?: boolean): Promise<ExecutionSignals | Error> {

	const exists: ExecutionSignals = await checkProcessExistance(parseInt(pid as string));

	if (exists == ExecutionSignals.NOT_FOUND) throw new Error(`Cannot initialize process with process id '${pid}'. The process may been killed or changed it's state.`); 

	if (exists !== ExecutionSignals.SUCCEED) throw new Error(`An unexpected error has been occurred. Not sure what actually happened, but it brokey sorry lmfao.`);

	return new Promise(function (resolve, reject) {

		const task = cp.exec(`taskkill /pid ${pid} ${force === true ? "/f" : ""}`, function (err: ExecException | null, stdout: string, stdin: string) {

			if (err !== null) reject(ExecutionSignals.ABORTED);

			if (stdout !== null) resolve(ExecutionSignals.SUCCEED);
			if (stderr !== null) reject(ExecutionSignals.ERROR);
		});

	});
}