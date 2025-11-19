import { assertEquals } from "@std/assert";
import { chat } from "./chat.ts";
import type { ChatMessage } from "../../proto/chat/v1/chat_pb.ts";
import { chatEvents } from "../../events.ts";

Deno.test("chat service", async (t) => {
  await t.step("processes empty message stream", async () => {
    async function* emptyMessages() {}

    const generator = chat(emptyMessages());
    const iterator = generator[Symbol.asyncIterator]();
    const result = await iterator.next();

    assertEquals(result.done, true);
  });

  await t.step("echoes single message", async () => {
    const message: ChatMessage = {
      userId: "manu",
      message: "Hello!",
      timestamp: new Date().toISOString(),
    } as ChatMessage;

    async function* singleMessage() {
      yield message;
    }

    const generator = chat(singleMessage());
    const iterator = generator[Symbol.asyncIterator]();
    const result = await iterator.next();

    assertEquals(result.done, false);
    if (!result.done && result.value) {
      assertEquals(result.value.userId, message.userId);
      assertEquals(result.value.message, message.message);
    }

    const finalResult = await iterator.next();
    assertEquals(finalResult.done, true);
  });

  await t.step("echoes multiple messages", async () => {
    const messages: ChatMessage[] = [
      {
        userId: "manu",
        message: "Message 1",
        timestamp: new Date().toISOString(),
      },
      {
        userId: "bob",
        message: "Message 2",
        timestamp: new Date().toISOString(),
      },
    ] as ChatMessage[];

    async function* multipleMessages() {
      for (const msg of messages) {
        yield msg;
      }
    }

    const generator = chat(multipleMessages());
    const results: ChatMessage[] = [];

    for await (const msg of generator) {
      results.push(msg);
    }

    assertEquals(results.length, 2);
    assertEquals(results[0].userId, "manu");
    assertEquals(results[0].message, "Message 1");
    assertEquals(results[1].userId, "bob");
    assertEquals(results[1].message, "Message 2");
  });

  await t.step("emits events for messages", async () => {
    const userId = "test-user";
    const message: ChatMessage = {
      userId,
      message: "Test event",
      timestamp: new Date().toISOString(),
    } as ChatMessage;

    let receivedEvent: ChatMessage | undefined;
    const handler = (event: ChatMessage) => {
      receivedEvent = event;
    };

    chatEvents.once(userId, handler);

    async function* singleMessage() {
      yield message;
    }

    const generator = chat(singleMessage());
    const iterator = generator[Symbol.asyncIterator]();
    await iterator.next();

    // Give event loop a chance to process
    await new Promise((resolve) => setTimeout(resolve, 10));

    assertEquals(receivedEvent?.userId, userId);
    assertEquals(receivedEvent?.message, "Test event");

    chatEvents.removeListener(userId, handler);
  });
});
