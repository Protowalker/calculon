export const waitFor = (ms: number) => new Promise((resolve, _) => setTimeout(resolve, ms));

export function assert<T>(cond: T, message?: string): asserts cond {
    if(cond) {
        return;
    } 
    throw new Error("assertion failed: " + message);
}