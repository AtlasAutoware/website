/*
 * Secrets reach the server code two ways: as the `env` object Cloudflare passes to the Worker's
 * fetch handler (set once per request in server.ts), or as process.env on Node hosts. Server
 * functions read them through runtimeSecret() so neither path leaks into the client bundle.
 */

type RuntimeEnv = Record<string, unknown>;

let workerEnv: RuntimeEnv | undefined;

export function setRuntimeEnv(env: unknown): void {
  if (env && typeof env === "object") workerEnv = env as RuntimeEnv;
}

export function runtimeSecret(name: string): string | undefined {
  const fromWorker = workerEnv?.[name];
  if (typeof fromWorker === "string" && fromWorker.length > 0) return fromWorker;
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  const fromNode = proc?.env?.[name];
  return typeof fromNode === "string" && fromNode.length > 0 ? fromNode : undefined;
}
