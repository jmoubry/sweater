import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Chat } from '../models/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  constructor(private socket: Socket) { }

  getMessages() {
    return this.socket.fromEvent<Chat>('message-broadcast');
  }

  sendMessage(threadId: number, chat: Chat) {
    console.log('emitting ' + chat.message);
    this.socket.emit('message', chat);
  }
}
