# better-tasklist

> A Javascript written wrapper for the Windows [`tasklist`](https://technet.microsoft.com/en-us/library/bb491010.aspx) command. 
``better-tasklist`` gives developers the ability to control running windows tasks.
Inspired by [@sindresorhus](https://github.com/sindresorhus)'s tasklist wrapper, [``tasklist``](https://github.com/sindresorhus/tasklist).

- - -

## Installation

Installing ``better-tasklist`` can be done using the following command down below.

```
$ npm install better-tasklist
```

You might need to install [`csv-parser`](https://www.npmjs.com/package/csv-parser) as well. That can also be done by the following command down below.

```
$ npm install csv-parser
```

## Usage


```ts
import tasklist, { FilteredWindowsProcesses, FetchedWindowsProcesses } from "better-tasklist";

(async function() {
    // Start writing your program here.

    // The verbose property is optional which will return detailed results.
    const processes: FetchedWindowsProcesses = await tasklist.fetch({verbose: true}); 

    // Returns an array with fetched Windows processes that has the name 'svchost.exe'.
    const filtered: FilteredWindowsProcesses = await tasklist.filter(processes, {
        imageName: "svchost.exe"
    });

    console.log(filtered);
    /* Returns an array with objects like this
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
.fetch(options: FetchingOptions | null, events?: FetchingEvents) => Promise<FetchedWindowsProcesses | WindowsProcess[]>;
```

Retrieves all active and inactive processes. The options are optional.

The ``options`` parameter has to be either ``null`` or [``FetchingOptions``](./docs/interfaces.md).
Use ``null`` to skip this paramater.


### ``filterFetchedProcesses(fetchedProcesses, filter);``

```ts
.filter(fetchedProcesses: FetchedWindowsProcesses, filter: FilteringKeywords): FilteredWindowsProcesses | WindowsProcess[];
```

Filters one or more processes based on the given filter name.

The ``fetchedProcesses`` parameter is a reference to [``FetchedWindowsProcesses``](./docs/interfaces.md). <br> 
The ``filter`` parameter is a reference to [``FilteringKeywords``](./docs/interfaces.md) object.

### ``killProcessByPID(pid);``

```ts
.killProcessByPID(pid: string | number, force?: boolean): Promise<ExecutionSignals | Error>;
```

Stops an active Windows process. If the process cannot be stopped, try forcing it.

The ``force`` parameter (``boolean``) is an optional parameter, forcing killing the process.

- See enum [``ExecutionSignals``](./docs/interfaces.md)

## Examples

```ts
import tasklist, { IEnumeratedProcesses } from "better-tasklist";

(async function () {

    // Fetching active Windows processes the fast way.
    const normal: WindowsProcess[] = await tasklist.fetch({ verbose: false });

    // Fetching both all active and inactive Windows processes the slow way.
    const verbose: WindowsProcess[] = await tasklist.fetch({ verbose: true });

    console.log(`Retreived ${normal.length} non-verbose processes.`);
    console.log(`Retreived ${verbose.length} verbose processes.`);
})();
```

```ts
import tasklist, { FetchedWindowsProcesses } from "better-tasklist";

(async function () {

    const fetchedProcesses: FetchedWindowsProcesses = await tasklist.fetch({ verbose: false });

    const filteredProcesses = await tasklist.filter(fetchedProcesses, {
        imageName: "Discord.exe"
    });

    console.log(filter);
})();

```

```ts
import tasklist, { FetchedWindowsProcesses, WindowsProcess } from "better-tasklist";

(async function () {

    const fetchedProcesses: FetchedWindowsProcesses = await tasklist.fetch({ verbose: false });

    const filteredProcesses = await tasklist.filter(fetchedProcesses, {
        imageName: "Among us.exe"
    });


    filteredProcesses.forEach(function(windowsProcess: WindowsProcess) {

        tasklist.killProcessByPID(fetchedProcess.pid, true);
    });
})();

```

## Help and other related things

If there are any bugs, or things that makes no sense (most likely), feel free to create an issue and I'll fix it. 

- Microsoft Windows CMD [``tasklist``](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb491010(v=technet.10)?redirectedfrom=MSDN) command.
- Microsoft Windows CMD [``taskkill``](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill) command.
