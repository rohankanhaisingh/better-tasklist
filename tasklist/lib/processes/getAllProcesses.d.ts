/// <reference types="node" />
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
export declare type IEnumeratedProcesses = Array<FetchedProcess>;
export declare type TasklistHeaders = "default" | "verbose";
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
export declare function _filterFetchedProcesses(fetchedProcesses: IEnumeratedProcesses, filter: EnumeratedProcessesFilter): IEnumeratedProcesses;
/**
 * Fetches all running processes (tasks) and returns an array with the data included. The options are optional.
 *
 * Example:
 * .fetchAllProcesses() => Array<FetchedProcess>;
 * @param options
 */
export declare function _fetchProcesses(options?: ProcessesFetchOptions, events?: TasklistFetchEvents): Promise<IEnumeratedProcesses>;
export declare class _ProcessWrapper {
    constructor(fetchedProcess: FetchedProcess);
    KillProcess(): Promise<void>;
}
