// ============ Interfaces ============

export interface FetchingOptions {
	timeout?: number;
	verbose?: boolean;
}

export interface WindowsProcess {
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

export interface FilteringKeywords {
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

export interface FetchingDetails {
	started: number | null;
	ended: number | null;
	receivedBytes: number | null;
	results: any;
	taskPid: string | number | null;
}

export interface FetchingEvents {
	end?: (results: FetchingDetails) => void;
	data?: (buffer: Buffer, details: FetchingDetails) => void;
	error?: (details: FetchingDetails) => void;
}

// ============ Types ============

export type FetchedWindowsProcesses = WindowsProcess[];
export type FilteredWindowsProcesses = FetchedWindowsProcesses;
export type TasklistHeaders = "default" | "verbose";

export enum ExecutionSignals {
	SUCCEED = 0,
	ABORTED = 1,
	ERROR = 2,
	NOT_FOUND = 3,
	UNCAUGHT_ERROR = 4
}