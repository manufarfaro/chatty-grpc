import type { PingRequest } from "../../proto/chat/v1/chat_pb.ts";

import { assertEquals } from "@std/assert";
import { ping } from "./ping.ts";

Deno.test("ping service", async (t) => {
  await t.step("returns pong with request message", async () => {
    const request: PingRequest = { message: "Hello" } as PingRequest;

    const response = await ping(request);

    assertEquals(response.message, "Pong: Hello");
  });

  await t.step("handles empty message", async () => {
    const request: PingRequest = { message: "" } as PingRequest;

    const response = await ping(request);

    assertEquals(response.message, "Pong: ");
  });

  await t.step("handles special characters", async () => {
    const request: PingRequest = { message: "Hello 🚀 World!" } as PingRequest;

    const response = await ping(request);

    assertEquals(response.message, "Pong: Hello 🚀 World!");
  });
});
