# better-tasklist

A documentation about every existing interface, enums and types.

## Interfaces 

### ``ProcessFetchOptions``
Options that can be used when calling the ``.fetchAllProcesses()`` function.

```ts
interface ProcessesFetchOptions {
    timeout?: number; // The amount of time the csv-parser has to parse the tasklist it's output.
    verbose?: boolean; // Will return detailed data, it might take longer than when setting it to false.
}
```

### ``TasklistFetchEvents``
Events for the fetch process, when calling ``.fetchAllProcesses()``.

```ts
interface TasklistFetchEvents {
    
    // Event that will be called when all the data has been fetched, passing an object with the process details.
    // See interface 'TasklistProcessDetails' for me info.
    end?: (results: TasklistProcessDetails) => void;

    // Event that will be called when the tasklist process received data.
    // The called function comes with two arguments, the buffer and the tasklist process it's details.
    // See interface 'TasklistProcessDetails' for me info.
    data?: (buffer: Buffer, details: TasklistProcessDetails) => void;

    // Event that will be called when an error occurred.
    error?: (details: TasklistProcessDetails) => void;
}
```

### ``TasklistProcessDetails``
An object, containing details about the fetching process.
```ts
interface TasklistProcessDetails {
    started: number | null; // Timestamp when the process started.
    ended: number | null; // Timestamp when the process ended.
    receivedBytes: number | null; // Received bytes.
    results: any; // Results.
    taskPid: string | number | null; // The tasklist process it's pid.
}
```

### ``FetchedProcess``
An object, containing details about a fetched process. The properties are marked as read-only, they cannot be modified.

See [``tasklist.exe``](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb491010(v=technet.10)) for more info.
```ts
interface FetchedProcess {
    readonly imageName: string;
    readonly pid: string | number;
    readonly sessionName: string;
    readonly sessionNumber: number;
    readonly memUsage: number;
    readonly status: string;
    readonly username: string;
    readonly cpuTime: string;
    readonly windowTitle: string;
}
```

### ``EnumeratedProcessesFilter``
Options that can be use when filtering the enumerated fetched list of processes, giving specific results.

This can be used when calling the ``filterFetchedProcesses()`` function.

```ts
interface EnumeratedProcessesFilter {
    imageName?: string;
    pid?: number | string;
    sessionName?: string;
    sessionNumber?: string | number;
    memUsage?: string;
    status?: string;
    username?: string;
    cpuTime?: string;
    windowTitle?: string;
}
```

## Types

### ``IEnumeratedProcesses``
The type ``IEnumeratedProcesses`` has been declared as an array with [``FetchedProcess``](#FetchedProcess) objects.

When calling the ``fetchAllProcesses()`` function, or ``filterFetchedProcesses()``, an array with type ``IEnumeratedProcesses`` will be returned.
```ts
type IEnumeratedProcesses = FetchedProcess[] | Array<FetchedProcess>;
```

### ``TasklistHeaders``
Headers when fetching the tasklist.

```ts
type TasklistHeaders = "default" | "verbose";
```

## Enums

### ``ExecutionSignals``
Signals that can be returned when calling the ``killProcessByPID()`` function.

```ts
enum ExecutionSignals {
    SUCCEED = 0,
    ABORTED = 1,
    ERROR = 2,
    NOT_FOUND = 3,
    UNCAUGHT_ERROR = 4
}
```