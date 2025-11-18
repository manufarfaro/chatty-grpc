import { assertEquals } from "@std/assert";
import { ping } from "./ping.ts";
import type { PingRequest } from "../../proto/chat/v1/chat_pb.ts";

Deno.test("ping service", async (t) => {
  await t.step("returns pong", async () => {
    const request: PingRequest = {} as PingRequest; // empty request
    const response = await ping(request);
    assertEquals(response.message, "Pong");
  });
});
