/**
 *  better-tasklist.js (or ts) by Babah Gee.
 *  
 *  A simple, lightweight and ready-to-use tasklist wrapper to handle Windows processes.
 *	Inspired by the original NPM package named 'tasklist'.
*/

import { _fetchProcesses, _filterFetchedProcesses } from "./processes/getAllProcesses";
import { _killProcessByPID } from "./processes/killProcess";


// ============== Main default namespace ==============
namespace tasklist {

	export const fetchAllProcesses = _fetchProcesses;
	export const filterFetchedProcesses = _filterFetchedProcesses;

	export const killProcessByPID = _killProcessByPID;
}

// ============== Exporting enums, interfaces and types ==============
export { ProcessesFetchOptions, FetchedProcess, IEnumeratedProcesses, EnumeratedProcessesFilter, TasklistFetchEvents, TasklistHeaders, TasklistProcessDetails } from "./processes/getAllProcesses"
export { ExecutionResult } from "./processes/killProcess"

export default tasklist;