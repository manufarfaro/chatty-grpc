import type { PingRequest } from "../../proto/chat/v1/chat_pb.ts";

export function ping(request: PingRequest) {
  console.log("📥 Ping received:", request.message);
  return {
    message: `Pong: ${request.message}`,
  };
}
