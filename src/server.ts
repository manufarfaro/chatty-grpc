import { connectNodeAdapter } from "@connectrpc/connect-node";
import { createServer, type Server } from "node:http";
import { registerServices } from "./services/mod.ts";

export function startServer(port: number): Server {
  const handler = connectNodeAdapter({
    routes: (router) => {
      registerServices(router);
    },
  });

  return createServer(handler).listen(port, () => {
    console.log(`🚀 Chatty gRPC server running on http://localhost:${port}`);
  });
}
