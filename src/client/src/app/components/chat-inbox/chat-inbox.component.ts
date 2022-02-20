import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ThreadService } from 'src/app/services/thread.service';
import { ChatSocketService } from '../../services/chat-socket.service';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  @Input() threadId: number;
  username: string = 'Jami';
  message: string;
  messages: Chat[] = [];

  constructor(private chatSocketService: ChatSocketService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.threadService.getThreadChats(this.threadId).subscribe(c => this.messages = c.data);

    this.chatSocketService.getMessages().subscribe(response => {
      this.messages.push(response);
    });
  }

  sendMessage() {
    const chat: Chat = { id: 0, message: this.message, username: this.username, created_at: new Date()};
    this.chatSocketService.sendMessage(this.threadId, chat);
    this.messages.push(chat);
    this.message = '';
 }
}
