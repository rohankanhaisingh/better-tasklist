/**
 *  better-tasklist.js (or ts) by Babah Gee.
 *  
 *  A simple, lightweight and ready-to-use tasklist wrapper to handle Windows processes.
 *	Inspired by the original NPM package named 'tasklist'.
*/

import { _fetchProcesses, _filterFetchedProcesses } from "./handlers/getAllProcesses";
import { _killProcessByPID } from "./handlers/killProcess";
import { _create_inline_process } from "./handlers/createInlineProcess"

// ============== Main default namespace ==============
namespace tasklist {

	export const fetchAllProcesses = _fetchProcesses;
	export const filterFetchedProcesses = _filterFetchedProcesses;

	export const killProcessByPID = _killProcessByPID;

	export const createInlineProcess = _create_inline_process;

}

// ============== Exporting enums, interfaces and types ==============
export { ProcessesFetchOptions, FetchedProcess, IEnumeratedProcesses, EnumeratedProcessesFilter, TasklistFetchEvents, TasklistHeaders, TasklistProcessDetails } from "./handlers/getAllProcesses"
export { ExecutionSignals } from "./handlers/killProcess"

// ============== Exporting classes ==============
export { InlineProcess } from "./classes/inlineProcess";

export default tasklist;