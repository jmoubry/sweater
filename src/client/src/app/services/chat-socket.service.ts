import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  constructor(private socket: Socket) { }

  getMessages() {
    return this.socket.fromEvent<Message>('message-broadcast');
  }

  sendMessage(message: string) {
    console.log('emitting ' + message);
    this.socket.emit('message', message);
  }
}
