import { computed } from "vue";
import { useCommander } from "./commander.context";

export function useCommand(name: string) {
  const commander = useCommander();

  const command = commander.getCommand(name);

  const execute = (params: Record<string, unknown>) => {
    const payload = params ? { name, params } : name;
    commander.execute(payload);
  };

  const canExecute = computed(() => {
    return commander.canExecute(name);
  });

  return {
    ...command,
    execute,
    canExecute,
  };
}
