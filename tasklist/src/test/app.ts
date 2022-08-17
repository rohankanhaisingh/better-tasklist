import tasklist, { ProcessesFetchOptions, IEnumeratedProcesses, TasklistProcessDetails } from "../index";

(async function () {

	const processes: IEnumeratedProcesses = await tasklist.fetchAllProcesses({verbose: true});

	const serviceHosts = tasklist.filterFetchedProcesses(processes, {
		imageName: "Spotify.exe",
	});

	console.log(serviceHosts);

})();