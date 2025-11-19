import { assertEquals } from "@std/assert";
import { sendLogs } from "./sendLogs.ts";
import type { LogEntry } from "../../proto/chat/v1/chat_pb.ts";

Deno.test("sendLogs service", async (t) => {
  await t.step("processes empty log stream", async () => {
    async function* emptyLogs() {
      // No logs
    }

    const result = await sendLogs(emptyLogs());

    assertEquals(result.userId, "system");
    assertEquals(result.message, "0 logs received");
  });

  await t.step("processes single log entry", async () => {
    const logEntry: LogEntry = {
      userId: "manu",
      message: "Test log",
      timestamp: "2024-01-01T10:00:00Z",
    } as LogEntry;

    async function* singleLog() {
      yield logEntry;
    }

    const result = await sendLogs(singleLog());

    assertEquals(result.userId, "system");
    assertEquals(result.message, "1 logs received");
  });

  await t.step("processes multiple log entries", async () => {
    const logEntries: LogEntry[] = [
      {
        userId: "manu",
        message: "Log 1",
        timestamp: "2024-01-01T10:00:00Z",
      },
      {
        userId: "bob",
        message: "Log 2",
        timestamp: "2024-01-01T10:01:00Z",
      },
      {
        userId: "manu",
        message: "Log 3",
        timestamp: "2024-01-01T10:02:00Z",
      },
    ] as LogEntry[];

    async function* multipleLogs() {
      for (const log of logEntries) {
        yield log;
      }
    }

    const result = await sendLogs(multipleLogs());

    assertEquals(result.userId, "system");
    assertEquals(result.message, "3 logs received");
  });
});
