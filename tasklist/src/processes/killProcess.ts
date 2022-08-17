export enum ExecutionResult {
	SUCCEED = 0,
	ABORTED = 1,
	ERROR = 2,
	NOT_FOUND = 3,
	UNCAUGHT_ERROR = 4
}

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
export async function _killProcessByPID(pid: string | number): Promise<ExecutionResult> {


	return ExecutionResult.SUCCEED;

}