import { assertEquals } from "@std/assert";
import { createRouterTransport } from "@connectrpc/connect";
import { createClient } from "@connectrpc/connect";
import { registerChatService } from "./mod.ts";
import { ChatService } from "../../proto/chat/v1/chat_pb.ts";

Deno.test("registerChatService - registers ChatService with router", async () => {
  const transport = createRouterTransport((router) => {
    registerChatService(router);
  });

  const client = createClient(ChatService, transport);

  const response = await client.ping({});

  assertEquals(response.message, "Pong");
});
