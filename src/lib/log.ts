let enabled = false;

export function enableLog(flag: boolean): void {
  enabled = flag;
}

export function createLogger(prefix: string): (...args: unknown[]) => void {
  return (...args: unknown[]) => {
    if (enabled) {
      console.debug(prefix, ...args);
    }
  };
}
