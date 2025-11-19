import type { ChatMessage, ConnectRequest } from "../../proto/chat/v1/chat_pb.ts";
import { chatEvents } from "../../events.ts";

export async function *listen(request: ConnectRequest) {
  const userId = request.userId;

  if (userId === undefined) {
    throw new Error("User ID is required");
  }

  console.log(`👂 Client connected to listen: ${userId}`);

  /**
   * @todo: no history for now, does not support race conditions
   */
  while (true) {
    const event = await new Promise<ChatMessage>((resolve) => {
      chatEvents.once(userId, (event: ChatMessage) => {
        resolve(event as ChatMessage);
      });
    });

    yield event;
  }
}