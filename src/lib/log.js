let isLogEnabled = false;
export function enableLog(enable = true) {
    isLogEnabled = enable;
}

export function createLogger(namespace = 'binpackingjs') {
    return log.bind(undefined, namespace);
}

export function log(namespace, ...args) {
    return isLogEnabled ? console.debug.apply(console, [namespace].concat(args)) : undefined;
}