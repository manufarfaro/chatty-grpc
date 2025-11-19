import { startServer } from "../../src/server.ts";
import { assertEquals } from "@std/assert";
import { createConnectTransport } from "@connectrpc/connect-node";
import { createClient } from "@connectrpc/connect";
import { ChatService } from "../../src/proto/chat/v1/chat_pb.ts";
import { chatEvents } from "../../src/events.ts";

Deno.test("server - starts and listens on port 8080", async () => {
  const port = 8080;
  const server = startServer(port);

  const transport = createConnectTransport({
    baseUrl: `http://localhost:${port}/`,
    httpVersion: "1.1",
  });

  const client = createClient(ChatService, transport);
  const response = await client.ping({});
  assertEquals(
    response.message,
    "Pong",
    "Server should respond with pong",
  );

  await server.close();
});

Deno.test({
  name: "server - Listen RPC streams messages",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const port = 8081;
    const server = startServer(port);

    const transport = createConnectTransport({
      baseUrl: `http://localhost:${port}/`,
      httpVersion: "1.1",
    });

    const client = createClient(ChatService, transport);
    const userId = "test-user-listen";

    // Emit a message after a short delay
    const testMessage = {
      userId,
      message: "Test message for listen",
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      chatEvents.emit(userId, testMessage);
    }, 50);

    const stream = client.listen({ userId });
    
    let receivedMessage = false;

    for await (const message of stream) {
      assertEquals(message.userId, userId);
      assertEquals(message.message, "Test message for listen");
      receivedMessage = true;
      break;
    }

    assertEquals(receivedMessage, true, "Should have received a message");

    await server.close();
  },
});

Deno.test("server - SendLogs RPC processes log stream", async () => {
  const port = 8082;
  const server = startServer(port);

  const transport = createConnectTransport({
    baseUrl: `http://localhost:${port}/`,
    httpVersion: "1.1",
  });

  const client = createClient(ChatService, transport);

  async function* logStream() {
    yield {
      userId: "manu",
      message: "Log entry 1",
      timestamp: "2024-01-01T10:00:00Z",
    };
    yield {
      userId: "bob",
      message: "Log entry 2",
      timestamp: "2024-01-01T10:01:00Z",
    };
  }

  const result = await client.sendLogs(logStream());

  assertEquals(result.userId, "system");
  assertEquals(result.message, "2 logs received");

  await server.close();
});
