import type { ConnectRouter } from "@connectrpc/connect";
import { registerChatService } from "./chat/mod.ts";

export function registerServices(router: ConnectRouter): void {
  registerChatService(router);
}
