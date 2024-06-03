# Vue-Kommando

Vue-Kommando is a Vue composition library for managing command execution with undo and redo capabilities. This library provides a simple and flexible API to handle command patterns in Vue applications, making it easier to manage complex interactions and state changes.

Designed by [Aleksej Dix](https://github.com/AleksejDix), ported as lib by me.

## Features

- **Command Registration**: Register commands with execution and undo functionality.
- **Execution Control**: Execute commands conditionally based on computed values.
- **Undo/Redo Stack**: Built-in undo and redo stack management.
- **Dependency Injection**: Support for providing and injecting commander context in the component tree.

## Installation

Install the library via npm or yarn:

```bash
npm install vue-kommando
# or
yarn add vue-kommando
```

## Usage

### Registering Commands

Commands can be registered using the `addCommand` function provided by `useCommander`.

```typescript
import { useCommander } from "vue-kommando";

const commander = useCommander();

commander.addCommand("exampleCommand", {
  execute: (params) => {
    console.log("Command executed with params:", params);
  },
  canExecute: computed(() => true),
  undo: () => {
    console.log("Undo executed");
  },
});
```

### Executing Commands

Commands can be executed using the `execute` function.

```typescript
commander.execute("exampleCommand", { key: "value" });
```

### Undo/Redo

Undo and redo functionality is available through `undo` and `redo` functions.

```typescript
commander.undo();
commander.redo();
```

### Using Commands in Components

The `useCommand` hook provides a way to interact with specific commands in your components.

```typescript
import { useCommand } from "vue-kommando";

const { execute, canExecute } = useCommand("exampleCommand");

if (canExecute.value) {
  execute({ key: "value" });
}
```

### Providing and Injecting Commander Context

You can provide and inject the commander context to use it in different parts of your application.

```typescript
import { createCommander, useCommander } from "vue-kommando";

export default {
  setup() {
    const commander = createCommander();
    return { commander };
  },
};

// In a child component
import { useCommander } from "vue-kommando";

export default {
  setup() {
    const commander = useCommander();
    return { commander };
  },
};
```

## API

### `useCommander`

- `addCommand(name: string, command: Command)`: Registers a new command.
- `execute(commandInfo: string | { name: string; params: Record<string, unknown> })`: Executes a command.
- `getCommand(name: string)`: Retrieves a command by name.
- `undo()`: Undoes the last executed command.
- `redo()`: Redoes the last undone command.
- `canUndo`: Computed property that indicates if an undo is possible.
- `canRedo`: Computed property that indicates if a redo is possible.
- `canExecute(name: string)`: Checks if a command can be executed.

### `useCommand`

- `execute(params: Record<string, unknown>)`: Executes the command with the provided parameters.
- `canExecute`: Computed property that indicates if the command can be executed.

### `createCommander`

- `createCommander()`: Creates and provides a commander context.

### `useMaybeCommander`

- `useMaybeCommander()`: Injects the commander context if available.

### `useCommander`

- `useCommander()`: Injects the commander context and throws an error if not found.

## License

Apache-2.0

---

Feel free to contribute to this library by submitting issues or pull requests on the [GitHub repository](https://github.com/your-repo/vue-kommando).
