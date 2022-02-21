export class Chat {
    id: number;
    thread_id: number;
    message: string;
    username: string;
    user_id: number;
    parent_chat_id: number | null;
    created_at: Date;
}
