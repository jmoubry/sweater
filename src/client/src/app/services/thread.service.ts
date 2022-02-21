import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Chat } from '../models/chat';
import { Thread } from '../models/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  baseUri:string = 'http://localhost:4000/threads';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  // Create
  createThread(data: Thread): Observable<any> {
    let url = `${this.baseUri}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  createThreadChat(threadId: number, data: Chat): Observable<any> {
    let url = `${this.baseUri}/${threadId}/chat`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all threads
  getThreads() {
    return this.http.get<PagedThreadResponse>(`${this.baseUri}`);
  }

  getThread(threadId: number) {
    return this.http.get<Thread>(`${this.baseUri}/${threadId}`);
  }

  getThreadChats(threadId: number) {
    return this.http.get<PagedChatResponse>(`${this.baseUri}/${threadId}/chats`);
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

class PagedThreadResponse {
  data: Thread[]
}

class PagedChatResponse {
  data: Chat[];
}
