import tasklist, { IEnumeratedProcesses } from "../index";

(async function () {

	const processes: IEnumeratedProcesses = await tasklist.fetchAllProcesses({verbose: true});

	console.log(processes);

})();