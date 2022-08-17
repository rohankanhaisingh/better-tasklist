/**
 *  better-tasklist.js (or ts) by Babah Gee.
 *
 *  A simple, lightweight and ready-to-use tasklist wrapper to handle Windows processes.
 *	Inspired by the original NPM package named 'tasklist'.
*/
import { _fetchProcesses, _filterFetchedProcesses } from "./processes/getAllProcesses";
import { _killProcessByPID } from "./processes/killProcess";
declare namespace tasklist {
    const fetchAllProcesses: typeof _fetchProcesses;
    const filterFetchedProcesses: typeof _filterFetchedProcesses;
    const killProcessByPID: typeof _killProcessByPID;
}
export { ProcessesFetchOptions, FetchedProcess, IEnumeratedProcesses, EnumeratedProcessesFilter, TasklistFetchEvents, TasklistHeaders, TasklistProcessDetails } from "./processes/getAllProcesses";
export { ExecutionResult } from "./processes/killProcess";
export default tasklist;
