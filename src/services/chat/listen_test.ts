import { assertEquals } from "@std/assert";
import { listen } from "./listen.ts";
import type { ChatMessage, ConnectRequest } from "../../proto/chat/v1/chat_pb.ts";
import { chatEvents } from "../../events.ts";

Deno.test("listen service", async (t) => {
  await t.step("throws error when userId is missing", async () => {
    const request = {} as ConnectRequest;
    let error: Error | undefined;
    
    try {
      const generator = listen(request);
      await generator.next();
    } catch (e) {
      error = e as Error;
    }
    
    assertEquals(error?.message, "User ID is required");
  });

  await t.step("yields messages for the user", async () => {
    const userId = "test-user";
    const request: ConnectRequest = {
      userId,
    } as ConnectRequest;

    const testMessage: ChatMessage = {
      userId,
      message: "Test message",
      timestamp: new Date().toISOString(),
    } as ChatMessage;

    const generator = listen(request);
    const iterator = generator[Symbol.asyncIterator]();
    
    setTimeout(() => {
      chatEvents.emit(userId, testMessage);
    }, 10);

    const result = await iterator.next();
    
    assertEquals(result.done, false);
    if (!result.done && result.value) {
      assertEquals(result.value.userId, userId);
      assertEquals(result.value.message, "Test message");
    }
    
    await iterator.return?.(undefined);
  });
});

