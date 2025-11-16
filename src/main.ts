import { startServer } from "./server.ts";

const DEFAULT_PORT = 8080;

// Run the application programmatically (used by tests and CLI)
export function runApp(port: number = DEFAULT_PORT) {
  return startServer(port);
}

// Entry point when executed via `deno run src/main.ts`
if (import.meta.main) {
  runApp();
}
