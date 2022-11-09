/**
 *  better-tasklist.js (or ts) by Babah Gee.
 *  
 *  A simple, lightweight and ready-to-use tasklist wrapper to handle Windows processes.
 *	Inspired by the original NPM package named 'tasklist'.
*/

import { _fetch, _filter } from "./handlers/getAllProcesses";
import { _killProcessByPID } from "./handlers/killProcess";
import { _create_inline_process } from "./handlers/createInlineProcess";

// ============== Main default namespace ==============
namespace tasklist {

	export const fetch = _fetch;
	export const filter = _filter;

	export const killProcessByPID = _killProcessByPID;

	export const createInlineProcess = _create_inline_process;

}

// ============== Exporting enums, interfaces and types ==============
export {
	WindowsProcess,
	FetchedWindowsProcesses,
	FilteredWindowsProcesses,
	ExecutionSignals,
	FetchingDetails,
	FetchingEvents,
	FetchingOptions,
	FilteringKeywords,
	TasklistHeaders
} from "./utils/typings";

// ============== Exporting classes ==============
export { InlineProcess } from "./classes/inlineProcess";

export default tasklist;