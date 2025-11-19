import type { ChatMessage } from "../../proto/chat/v1/chat_pb.ts";
import { chatEvents } from "../../events.ts";

export async function *chat(chatMessage: AsyncIterable<ChatMessage>): AsyncIterable<ChatMessage> {
    for await (const message of chatMessage) {
        chatEvents.emit(message.userId, message);
        yield message;
    }
}