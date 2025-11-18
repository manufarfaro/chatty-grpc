import type { PingRequest } from "../../proto/chat/v1/chat_pb.ts";

export function ping(_request: PingRequest) {
  console.log("📥 Ping received");
  return {
    message: "Pong",
  };
}
