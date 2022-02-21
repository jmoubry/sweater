import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
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

  constructor(private chatSocketService: ChatSocketService) { }

  ngOnInit(): void {
    this.chatSocketService.requestChats(this.threadId);

    this.chatSocketService.getChats().subscribe(response => {
      this.messages = response;
    });

    this.chatSocketService.getChat().subscribe(response => {
      this.messages.push(response);
    });
  }

  sendChat() {
    const userId = this.username === 'Jami' ? 1 : 2; // TODO: need to login and store user ID

    const chat: Chat = { id: 0, thread_id: this.threadId, message: this.message, username: this.username, user_id: userId, created_at: new Date(), parent_chat_id: null};
    this.chatSocketService.sendChat(chat);
    this.messages.push(chat);
    this.message = '';
 }
}
