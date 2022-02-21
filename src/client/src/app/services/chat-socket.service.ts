import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Chat } from '../models/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  constructor(private socket: Socket) { }

  getChat() {
    return this.socket.fromEvent<Chat>('chat-broadcast');
  }

  getChats() {
    return this.socket.fromEvent<Chat[]>('chats');
  }

  requestChats(threadId: number) {
    this.socket.emit('getChats', threadId);
  }

  sendChat(chat: Chat) {
    console.log('emitting ' + chat.message);
    this.socket.emit('chat', chat);
  }
}
