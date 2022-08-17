# better-tasklist

> A Javascript (Typescript) written wrapper for the Windows [`tasklist`](https://technet.microsoft.com/en-us/library/bb491010.aspx) command. 
``better-tasklist`` gives developers the ability to control running tasks.
Inspired by [@sindresorhus](https://github.com/sindresorhus) his own Windows ``tasklist`` wrapper [tasklist](https://github.com/sindresorhus/tasklist)

**Naming things is hard okay, be aware that things may not makes any sense**

- - -

## Installation

To install ``better-tasklist``, run the following command.

```
$ npm install better-tasklist --save-dev
```

## Usage

**Be aware** is written in TypeScript and uh, I haven't tested the ``require("better-tasklist")`` thing yet.

```ts
import tasklist from "better-tasklist";

// Need to create a asynchronous IIFE in order to use the ``await`` and ``async`` keywords.
(async function() {
    // Start coding here

    // The verbose property is optional which will return detailed results.
    const fetchedProcesses = await tasklist.fetchAllProcesses({verbose: true}); 

    // Returns an array with procceses with the name of 'scvhost.exe'.
    const filteredProcesses = await tasklist.filterFetchedProcesses(fetchedProcesses, {
        imageName: "svchost.exe"
    });

    /* The following code will return an array with objects like this
          {
            imageName: 'svchost.exe',
            pid: '6969', // Nice number
            sessionName: 'Services',
            sessionNumber: '0',
            memUsage: '6.412 K',
            status: 'Unknown',
            username: 'N/A',
            cpuTime: '0:00:00',
            windowTitle: 'N/A'
          }
    */
})();
```

## API usage

### ``fetchAllProcesses(options, events);``

```ts
.fetchAllProcesses(options: ProcessesFetchOptions | null, events?: TasklistFetchEvents) => Promise<IEnumeratedProcesses>;
```

Fetches all running processes (tasks) and returns an array with the data included. The options are optional.

The ``options`` paramater has to be either ``null`` or an object [``ProcessFetchOptions``](./docs/interfaces.md#ProcessFetchOptions).
``null`` is recommended if you want to skip this paramater.

Interfaces:
- See interface [``ProcessFetchOptions``](./docs/interfaces.md#ProcessFetchOptions)
- See interface [``TasklistFetchEvents``](./docs/interfaces.md#TasklistFetchEvents)
- See interface [``FetchedProcess``](./docs/interfaces.md#FetchedProcess)
- See type [``IEnumeratedProcesses``](./docs/interfaces.md#IEnumeratedProcesses)

### ``filterFetchedProcesses(fetchedProcesses, filter);``

```ts
.filterFetchedProcesses(fetchedProcesses: IEnumeratedProcesses, filter: EnumeratedProcessesFilter): IEnumeratedProcesses;
```

Filters the fetched proccesses, returning specific items you want.

The ``fetchedProcesses`` paramater has to be a [``IEnumeratedProcesses``](./docs/interfaces.md#IEnumeratedProcesses) type to filter the data in.
The ``filter`` paramater has to be an [``EnumeratedProcessesFilter``](./docs/interfaces.md#EnumeratedProcessesFilter) object.

- See interface [``FetchedProcess``](./docs/interfaces.md#FetchedProcess)
- See type [``IEnumeratedProcesses``](./docs/interfaces.md#IEnumeratedProcesses)
- See interface [``EnumeratedProcessesFilter``](./docs/interfaces.md#EnumeratedProcessesFilter)

### ``killProcessByPID(pid);``

```ts
.filterFetchedProcesses(pid: string | number, force?: boolean): IEnumeratedProcesses;
```

Filters the fetched proccesses, returning specific items you want.

The ``force`` parameter (which has to be either ``true`` or ``false``) is an optional paramater, forcing the process to kill if it has a higher priority index.

- See enum [``ExecutionSignals``](./docs/interfaces.md#ExecutionSignals)

## Examples

```ts
// Import the default namespace, with the interfaces, types and enums.
import tasklist, { IEnumeratedProcesses } from "better-tasklist";

// Need to create a asynchronous IIFE in order to use the ``await`` and ``async`` keywords.
(async function () {

    // Fetching processes the normal and fast way.
    const normalFetchedProcesses: IEnumeratedProcesses = await tasklist.fetchAllProcesses({ verbose: false });

    // Hmmmmmmmm, this might take a lil' while.
    const verbosedFetchedProcesses: IEnumeratedProcesses = await tasklist.fetchAllProcesses({ verbose: true });

    console.log(`Received ${normalFetchedProcesses.length} non-verbose processes.`);
    console.log(`Received ${verbosedFetchedProcesses.length} verbose processes.`);
   
    // Do something with the data, for example kill them cuz y not lmao.
})();

```

```ts
// Import the default namespace, with the interfaces, types and enums.
import tasklist, { IEnumeratedProcesses } from "better-tasklist";

// Need to create a asynchronous IIFE in order to use the ``await`` and ``async`` keywords.
(async function () {

    // Fetching processes the normal and fast way.
    const fetchedProcesses: IEnumeratedProcesses = await tasklist.fetchAllProcesses({ verbose: false });

    const filter = await tasklist.filterFetchedProcesses(fetchedProcesses, {
        imageName: "Discord.exe"
    }); // Returns an array with processes named "Discord.exe"
})();

```

```ts
// Import the default namespace, with the interfaces, types and enums.
import tasklist, { IEnumeratedProcesses } from "better-tasklist";

// Need to create a asynchronous IIFE in order to use the ``await`` and ``async`` keywords.
(async function () {

    // Fetching processes the normal and fast way.
    const fetchedProcesses: IEnumeratedProcesses = await tasklist.fetchAllProcesses({ verbose: false });

    const filter = await tasklist.filterFetchedProcesses(fetchedProcesses, {
        imageName: "Among us.exe"
    }); // Returns an array with processes named "Discord.exe"


    filter.forEach(function(fetchProcess: FetchedProcess) {

        // Kill every process with the image name "Among Us.exe".
        tasklist.killProcessByPID(fetchedProcess.pid, true);
    });
})();

```

## Help and uh, related things

If there are any bugs, or things that makes no sense (most likely), feel free to create an issue and I'll fix it. 

- Microsoft Windows CMD [``tasklist``](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb491010(v=technet.10)?redirectedfrom=MSDN) command.
- Microsoft Windows CMD [``taskkill``](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill) command.