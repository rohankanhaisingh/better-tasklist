import tasklist, { IEnumeratedProcesses } from "../index";

(async function () {

	const fetchedProcesses: IEnumeratedProcesses = await tasklist.fetchAllProcesses({ verbose: true });

	const serviceProcesses = await tasklist.filterFetchedProcesses(fetchedProcesses, {
		imageName: "svchost.exe"
	})

	console.log(serviceProcesses);

})();