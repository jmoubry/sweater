import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message';
import { ChatSocketService } from '../../services/chat-socket.service';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  message: string;
  messages: Message[] = [];

  constructor(private chatSocketService: ChatSocketService) { }

  ngOnInit(): void {
    this.chatSocketService.getMessages().subscribe(response => {
      this.messages.push(response);
    });
  }

  sendMessage() {
    this.chatSocketService.sendMessage(this.message);
    this.messages.push({ message: this.message, from: 'Me', sent: new Date()});
    this.message = '';
 }
}
