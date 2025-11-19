import type { LogEntry } from "../../proto/chat/v1/chat_pb.ts";
import type { UploadSummary } from "../../proto/chat/v1/chat_pb.ts";

export async function sendLogs(logs: AsyncIterable<LogEntry>): Promise<UploadSummary> {

  let count = 0;
  for await (const log of logs) {
    console.log("📤 Receiving logs:", log);
    count++;
  }

  return {
    userId: "system",
    message: `${count} logs received`,
    timestamp: new Date().toISOString(),
  } as UploadSummary;
}