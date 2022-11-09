# better-tasklist

A documentation about interface, enums and types used in this library.

## Interfaces 

### ``FetchingOptions``
Options that can be used when calling the ``.fetch()`` function.

```ts
interface FetchingOptions {
    timeout?: number; // The amount of time the csv-parser has to parse the tasklist it's output.
    verbose?: boolean; // Will return detailed data, it might take longer than when setting it to false.
}
```

### ``FetchingEvents``
Events that will be used while fetching.

```ts
interface FetchingEvents {
    
    // This event is called after successfully fetching Windows processes
    end?: (results: FetchingDetails) => void;

    // This event is called as soon as new data is received while retrieving all active and inactive Windows processes
    data?: (buffer: Buffer, details: FetchingDetails) => void;

    // Event called when an error has occurred.
    error?: (details: FetchingDetails) => void;
}
```

### ``FetchingDetails``
An object, containing details about the fetching process.
```ts
interface FetchingDetails {
    started: number | null; // Timestamp when the process started.
    ended: number | null; // Timestamp when the process ended.
    receivedBytes: number | null; // Received bytes.
    results: any; // Results.
    taskPid: string | number | null; // The tasklist process it's pid.
}
```

### ``WindowsProcess``
An object containing all information about the retrieved Windows process. All properties are marked as readonly, so they cannot be edited.

See [``tasklist.exe``](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb491010(v=technet.10)) for more info.
```ts
interface WindowsProcess {
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

### ``FilteringKeywords``
Keywords that can be used to filter all retrieved processes.

This can be used when calling the ``filter()`` function.

```ts
interface FilteringKeywords {
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

### ``FetchedWindowsProcesses``
The type ``FetchedWindwosProcesses`` has been defined as an array with [``WindowsProcess``](#WindowsProcess) objects.

When calling the ``fetch()`` function, or ``filter()``, an array (``FetchedWindowsProcesses``) will be returned.
```ts
type FetchedWindowsProcesses = WindowsProcess[];
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