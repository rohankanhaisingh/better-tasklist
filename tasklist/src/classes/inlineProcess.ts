// ============== Classes ==============

import { ChildProcessWithoutNullStreams } from "child_process";
import { InlineProcessOptions } from "../handlers/createInlineProcess";

export class InlineProcess {

	declare public programName: string;
	declare public options: InlineProcessOptions;

	declare public mainProcess: ChildProcessWithoutNullStreams;

	constructor(programName: string, options?: InlineProcessOptions) {

		this.programName = programName;
		this.options = { ...options };

	}
}