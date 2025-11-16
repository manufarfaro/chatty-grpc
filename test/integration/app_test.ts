import { runApp } from "../../src/main.ts";
import { assertEquals } from "@std/assert";

Deno.test("app - runApp starts server on default port", () => {
  const server = runApp();

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Unexpected server address");
  }

  assertEquals(address.port, 8080);

  server.close();
});
