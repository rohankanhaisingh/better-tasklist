import tasklist, { FetchedWindowsProcesses } from "../index";

(async function () {

	const processes: FetchedWindowsProcesses = await tasklist.fetch({verbose: true});

	console.log(processes);

})();