import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ThreadComponent } from './components/thread/thread.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'threads' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'edit-user/:id', component: UserEditComponent },
  { path: 'users-list', component: UserListComponent },
  { path: 'threads', component: ThreadListComponent },
  { path: 'thread/:id', component: ThreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
