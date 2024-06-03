import { provide, inject } from "vue";
import * as Commander from "./commander";

type CompositonFunctionReturn = ReturnType<typeof Commander.useCommander>;

const KEY = "DeepCommander";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createCommander() {
  const contex = Commander.useCommander();
  provide(KEY, contex);
  return contex;
}

export function useMaybeCommander() {
  const context = inject<CompositonFunctionReturn>(KEY);
  return context;
}

export function useCommander() {
  const context = inject<CompositonFunctionReturn>(KEY);
  if (!context) {
    throw new Error(`Please call ${KEY} on the appropriate parent component`);
  }
  return context;
}
