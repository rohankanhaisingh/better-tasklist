import tasklist, { FetchedWindowsProcesses } from "../index";

(async function () {

	const fetchedProcesses: FetchedWindowsProcesses = await tasklist.fetch({ verbose: true });

	const serviceProcesses = await tasklist.filter(fetchedProcesses, {
		imageName: "svchost.exe"
	})

	console.log(serviceProcesses);

})();