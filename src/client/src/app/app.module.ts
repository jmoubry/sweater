import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatInboxComponent } from './components/chat-inbox/chat-inbox.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ThreadComponent } from './components/thread/thread.component';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    ChatInboxComponent,
    ThreadListComponent,
    ThreadComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
