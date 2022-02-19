import { Component, OnInit } from '@angular/core';
import { ChatSocketService } from 'src/app/services/chat-socket.service';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  message: string;

  constructor(private chatSocketService: ChatSocketService) { }

  ngOnInit(): void {
    this.chatSocketService.setupSocketConnection();
  }

  SendMessage() {
    this.chatSocketService.sendMessage(this.message);
    this.message = '';
 }
}
