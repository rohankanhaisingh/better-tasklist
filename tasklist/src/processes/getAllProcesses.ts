import fs from "node:fs";
import cp, { ExecException } from "node:child_process";
import path from "node:path";
import url from "node:url";
import { parse, Parser } from "csv-parse";

// ============= Types and interfaces =============

export interface ProcessesFetchOptions {
	timeout?: number;
	verbose?: boolean;
}

export interface FetchedProcess {
	readonly imageName: string;
	readonly pid: string | number;
	readonly sessionName: string;
	readonly sessionNumber: number;
	readonly memUsage: number;
	readonly status: string;
	readonly username: string;
	readonly cpuTime: string;
	readonly windowTitle: string;
}

export interface EnumeratedProcessesFilter {
	imageName?: string;
	pid?: number | string;
	sessionName?: string;
	sessionNumber?: string | number;
	memUsage?: string;
	status?: string;
	username?: string;
	cpuTime?: string;
	windowTitle?: string;
}

export interface TasklistFetchEvents {
	end?: (results: TasklistProcessDetails) => void;
	data?: (buffer: Buffer, details: TasklistProcessDetails) => void;
	error?: (details: TasklistProcessDetails) => void;
}

export interface TasklistProcessDetails {
	started: number | null;
	ended: number | null;
	receivedBytes: number | null;
	results: any;
	taskPid: string | number | null;
}

export type IEnumeratedProcesses = Array<FetchedProcess>;

export type TasklistHeaders = "default" | "verbose";

// ============= Private functions =============

async function loadTasklist(options: ProcessesFetchOptions, events: TasklistFetchEvents): Promise<string>  {

	console.log(events);

	return new Promise(function (resolve, reject) {

		const taskDetails: TasklistProcessDetails = {
			started: Date.now(),
			ended: null,
			taskPid: null,
			receivedBytes: 0,
			results: null
		}

		const task = cp.exec(`tasklist /fo csv ${typeof options.verbose === "boolean" ? "/v" : ""}`, function (err: ExecException | null, stdout: string, stderr: string) {

			if (err !== null) return reject(err.message);

			if (stdout !== null) {

				taskDetails.results = stdout;

				resolve(stdout);
			}
		});


		taskDetails.taskPid = task.pid;


		task.stdout?.on("data", function (buffer: Buffer) {

			const outputBuffer = new Buffer(buffer.toString());

			const bufferLength: unknown = outputBuffer.byteLength;

			if (taskDetails.receivedBytes !== null) taskDetails.receivedBytes += parseInt(bufferLength as string);

			if (typeof events.data === "function") events.data(buffer, taskDetails);
		});

		task.stdout?.on("end", function () {

			if (typeof events.end === "function") events.end(taskDetails);
		});
	});
}

function clearOutput(input: string): string {

	const output: string[] = input.split("\n");

	for (let i = 0; i < input.length; i++) {

		const line = input[i];

		if (line === undefined) output.splice(i, 1);

	}

	return output.join("\n");
}

function getTasklistHeaders(type: TasklistHeaders) {

	switch (type) {
		case "default":

			return ["imageName", "pid", "sessionName", "sessionNumber", "memUsage"];
			break;
		case "verbose":

			return ['imageName', 'pid', 'sessionName', 'sessionNumber', 'memUsage', 'status', 'username', 'cpuTime', 'windowTitle']
			break;
	}

}

async function parseOutputContent(input: string, options: ProcessesFetchOptions): Promise<FetchedProcess[]> {

	const tasklistHeaders = getTasklistHeaders(typeof options.verbose === "boolean" ? "verbose" : "default");

	const parser: Parser = parse({ columns: tasklistHeaders});

	const data: FetchedProcess[] = [];

	const prom: Promise<FetchedProcess[]> = new Promise(function (resolve, reject) {

		parser.on("data", function (chunk: FetchedProcess) {

			data.push(chunk as FetchedProcess);
		});

		parser.on("error", function (err: Error) {

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
}

function filterObjectByImageName(obj: FetchedProcess, imageName: string | null): boolean {

	const objImageName = obj.imageName;

	if (imageName === null) return false;

	if (objImageName === imageName) return true;

	return false;
}



// ============= Public functions =============

/**
 * Filters the fetched list of processes, returning specific results to handle with.
 * The filter parameter is required.
 * 
 * Example:
 * .filterFetchedProcesses(myFetchedProcesses, { imageName: "svchost.exe" }) => IEnumeratedProcesses<FetchedProcess>;
 * .filterFetchedProcesses(myFetchedProcesses, { pid: 420 | "6969" }) => IEnumeratedProcesses<FetchedProcess>;
 * 
 * @param fetchedProcesses Array (IEnumeratedProcesses) with fetch proccess to filter.
 * @param filter Filter methods.
 */
export function _filterFetchedProcesses(fetchedProcesses: IEnumeratedProcesses, filter: EnumeratedProcessesFilter): IEnumeratedProcesses {

	const filteredProcesses: IEnumeratedProcesses = [];

	for (let i = 0; i < fetchedProcesses.length; i++) {

		const p = fetchedProcesses[i];

		if (filterObjectByImageName(p, typeof filter.imageName === "string" ? filter.imageName : null)) filteredProcesses.push(p);
	}
	 
	return filteredProcesses;
}

/**
 * Fetches all running processes (tasks) and returns an array with the data included. The options are optional.
 * 
 * Example:
 * .fetchAllProcesses() => Array<FetchedProcess>;
 * .fetchAllProcesses({ verbose: true }) => Array<[Detailed]FetchedProcess>;
 * .fetchAllProcesses({ timeout: 1000 }) => Array<[Awaited]FetchedProcess>;
 * .fetchAllProcesses(null, {end: myFunction}) => Array<FetchedProcess>;
 * .fetchAllProcesses(null, {data: myFunction}) => Array<FetchedProcess>;
 * .fetchAllProcesses(null, {error: myFunction}) => Array<FetchedProcess>;
 * @param options Options when fetching running processes. 
 * @param events Events that can be used before, while and after running the process.
 */
export async function _fetchProcesses(options?: ProcessesFetchOptions, events?: TasklistFetchEvents): Promise<IEnumeratedProcesses> {

	const tasklistOutput = await loadTasklist({ ...options }, {...events});

	const parsedProcesses = await parseOutputContent(tasklistOutput, {...options});

	return [...parsedProcesses];
}

export class _ProcessWrapper {
	constructor(fetchedProcess: FetchedProcess) {

	}
	public async KillProcess() {


	}
}