import { startServer } from "../../src/server.ts";
import { assertEquals } from "@std/assert";
import { createConnectTransport } from "@connectrpc/connect-node";
import { createClient } from "@connectrpc/connect";
import { ChatService } from "../../src/proto/chat/v1/chat_pb.ts";

Deno.test("server - starts and listens on port 8080", async () => {
  const port = 8080;
  const server = startServer(port);

  const transport = createConnectTransport({
    baseUrl: `http://localhost:${port}/`,
    httpVersion: "1.1",
  });

  const client = createClient(ChatService, transport);
  const response = await client.ping({ message: "Integration test" });
  assertEquals(
    response.message,
    "Pong: Integration test",
    "Server should respond with pong",
  );

  await server.close();
});
