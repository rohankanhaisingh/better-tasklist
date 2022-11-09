import cp, { ExecException } from "node:child_process";
import { parse, Parser } from "csv-parse";

import { FetchedWindowsProcesses, FetchingDetails, FetchingEvents, FetchingOptions, FilteredWindowsProcesses, FilteringKeywords, TasklistHeaders, WindowsProcess } from "../utils/typings";


// ============= Private functions =============

async function loadTasklist(options: FetchingOptions, events: FetchingEvents): Promise<string>  {

	return new Promise(function (resolve, reject) {

		const taskDetails: FetchingDetails = {
			started: Date.now(),
			ended: null,
			taskPid: null,
			receivedBytes: 0,
			results: null
		}

		const task = cp.exec(`tasklist /fo csv ${options.verbose ? "/v" : ""}`, function (err: ExecException | null, stdout: string, stderr: string) {

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

async function parseOutputContent(input: string, options: FetchingOptions): Promise<WindowsProcess[]> {

	const tasklistHeaders = getTasklistHeaders(options.verbose ? "verbose" : "default");

	const parser: Parser = parse({ columns: tasklistHeaders, skipRecordsWithError: true});

	const data: WindowsProcess[] = [];

	const prom: Promise<WindowsProcess[]> = new Promise(function (resolve, reject) {

		parser.on("data", function (chunk: WindowsProcess) {

			data.push(chunk as WindowsProcess);
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

// Filters 
function filterObjectByImageName(obj: WindowsProcess, imageName: string | null): boolean {

	const objImageName = obj.imageName;

	if (imageName === null) return false;

	if (objImageName === imageName) return true;

	return false;
}

function filterObjectByPID(obj: WindowsProcess, pid: string | number | null): boolean {

	if (typeof pid === "string") {

		if (obj.pid === pid) return true;

	}  

	if (typeof pid === "number") {

		const convertedNumber = parseInt(obj.pid as string);

		
		if (convertedNumber === pid) return true;
	}

	return false;
}

function filterObjectBySessionName(obj: WindowsProcess, sessionName: string | null): boolean {

	if (sessionName === null) return false;

	// Lmao
	if (obj.sessionName === sessionName) return <boolean | true> true as boolean;

	return false;
}

// ============= Public functions =============






/**
 * Filters retrieved Windows processes based on the given properties.
 * 
 * Example:
 * .filter(myFetchedProcesses, { imageName: "svchost.exe" }) => FetchedProcess[];
 * .filter(myFetchedProcesses, { pid: 420 | "6969" }) => FetchedProcess[];
 * 
 * @param fetchedProcesses Array (FetchedProcess[]) with fetched Windows proccess to filter.
 * @param filter Filter keywords.
 */
export function _filter(fetchedProcesses: FetchedWindowsProcesses, filter: FilteringKeywords): FilteredWindowsProcesses {

	const filteredProcesses: FilteredWindowsProcesses = [];

	for (let i = 0; i < fetchedProcesses.length; i++) {

		const p = fetchedProcesses[i];

		if (filterObjectByImageName(p, typeof filter.imageName === "string" ? filter.imageName : null)) filteredProcesses.push(p);
		if (filterObjectByPID(p, (typeof filter.pid === "string" || typeof filter.pid === "number") ? filter.pid : null)) filteredProcesses.push(p);
		if (filterObjectBySessionName(p, typeof filter.sessionName === "string" ? filter.sessionName : null)) filteredProcesses.push(p);
	}

	return filteredProcesses;
}
/**
 * Fetches all running processes (tasks) and returns an array with the data included. The options are optional.
 * 
 * Example:
 * .fetch() => WindowsProcess[];
 * .fetch({ verbose: true }) => WindowsProcess[];
 * .fetch({ timeout: 1000 }) => WindowsProcess[];
 * .fetch(null, {end: myFunction}) => WindowsProcess[];
 * .fetchAllProcesses(null, {data: myFunction}) => WindowsProcess[];
 * .fetch(null, {error: myFunction}) => WindowsProcess[];
 * @param options Options that can be used while retrieving processes
 * @param events Events that can be used before, while and after running the retreiving process.
 */
export async function _fetch(options: FetchingOptions | null, events?: FetchingEvents): Promise<FetchedWindowsProcesses> {

	const tasklistOutput = await loadTasklist({ ...options }, {...events});

	const parsedProcesses = await parseOutputContent(tasklistOutput, {...options});

	return [...parsedProcesses];
}