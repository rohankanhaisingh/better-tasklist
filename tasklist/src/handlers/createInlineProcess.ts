import { SignalConstants } from "os";

// ============== Interfaces, enums and types ==============

export interface InlineProcessOptions {
	args?: string[];
	workingDirectory?: string;
	hideWindowOnStartup?: boolean;
	isShell?: boolean;
	lifetime?: number;
	killSignal?: SignalConstants;
	isDetachedFromMainProcess?: boolean;
}

// ============== Public functions ==============

import { InlineProcess } from "../classes/inlineProcess";

export function _create_inline_process(programName: string, options?: InlineProcessOptions): InlineProcess {

	const inlineProcess = new InlineProcess(programName, options);


	return inlineProcess;
}