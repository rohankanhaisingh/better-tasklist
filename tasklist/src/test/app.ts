import tasklist, { ProcessesFetchOptions, IEnumeratedProcesses, TasklistProcessDetails } from "../index";

(async function () {

	const processes: IEnumeratedProcesses = await tasklist.fetchAllProcesses({ verbose: true, timeout: 1000 });

	const serviceHosts = tasklist.filterFetchedProcesses(processes, {
		imageName: "svchost.exe",
	});

	console.log(serviceHosts);

})();