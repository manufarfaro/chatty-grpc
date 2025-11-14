import { connectNodeAdapter } from "npm:@connectrpc/connect-node";
import { createServer } from "node:http";
import { registerServices } from "./services/mod.ts";

const handler = connectNodeAdapter({
  routes: (router) => {
    registerServices(router);
  },
});

const port = 8080;

export function startServer(): void {
  createServer(handler).listen(port, () => {
    console.log(`🚀 Chatty gRPC server running on http://localhost:${port}`);
  });
}
