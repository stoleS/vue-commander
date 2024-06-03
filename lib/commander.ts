import { ref, computed } from "vue";
import type { ComputedRef } from "vue";

export type CommandParams = unknown;

export type Command = {
  execute: (params?: Record<string, unknown>) => void;
  canExecute: ComputedRef<boolean>;
  undo?: () => void;
};

export type CommandMap = {
  [key: string]: Command;
};

export function useCommander() {
  const registry = ref<CommandMap>({});
  const undoStack = ref<Command[]>([]);
  const redoStack = ref<Command[]>([]);

  const undo = () => {
    const command = undoStack.value.pop();
    if (command) {
      command.undo && command.undo();
      redoStack.value.push(command);
    }
  };

  const canUndo = computed(() => undoStack.value.length > 0);

  const redo = () => {
    const command = redoStack.value.pop();
    if (command) {
      command.execute();
      undoStack.value.push(command);
    }
  };

  const canRedo = computed(() => redoStack.value.length > 0);

  const addCommand = (name: string, command: Command) => {
    registry.value[name] = command;
    return () => delete registry.value[name];
  };

  const execute = (
    commandInfo: string | { name: string; params: Record<string, unknown> }
  ) => {
    let name: string;
    let params: Record<string, unknown> = {};

    if (typeof commandInfo === "string") {
      name = commandInfo;
    } else {
      name = commandInfo.name;
      params = commandInfo.params || {};
    }

    const command = registry.value[name];

    if (command && command.canExecute) {
      command.execute(params);
      if ("undo" in command) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        undoStack.value.push(command);
        redoStack.value = [];
      }
    }
  };

  const getCommand = (name: string) => {
    const command = registry.value[name];
    if (!command) throw new Error(`Command ${name} not found`);
    return command;
  };

  const canExecute = (name: string) => {
    const command = registry.value[name];
    return command && command.canExecute;
  };

  return {
    addCommand,
    execute,
    getCommand,
    undoStack,
    redoStack,
    undo,
    canUndo,
    redo,
    canRedo,
    canExecute,
  };
}
