import tasklist  from "../index";

(async function () {

	const myProcess = tasklist.createInlineProcess("oktay.exe", {
		args: ["bruh"]
	});


	console.log(myProcess);
})();