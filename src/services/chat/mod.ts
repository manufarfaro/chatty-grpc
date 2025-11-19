import type { ConnectRouter } from "@connectrpc/connect";

import { ChatService } from "../../proto/chat/v1/chat_pb.ts";
import { ping } from "./ping.ts";
import { listen } from "./listen.ts";
import { chat } from "./chat.ts";
import { sendLogs } from "./sendLogs.ts";

export function registerChatService(router: ConnectRouter): void {
  console.log("Registering chat service");

  router.service(ChatService, {
    ping,
    listen,
    chat,
    sendLogs,
  });
}
