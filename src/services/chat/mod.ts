import { ChatService } from "../../proto/chat/v1/chat_pb.ts";
import type { ConnectRouter } from "@connectrpc/connect";
import { ping } from "./ping.ts";

export function registerChatService(router: ConnectRouter): void {
  console.log("Registering chat service");

  router.service(ChatService, {
    ping,
  });
}
