import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  socket: any;

  constructor() { }

  setupSocketConnection() {
    const SOCKET_ENDPOINT = 'localhost:4000';
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
       console.log(data);
      }
    });
  }

  sendMessage(message: string) {
    console.log('emitting ' + message);
    this.socket.emit('message', message);
  }
}
