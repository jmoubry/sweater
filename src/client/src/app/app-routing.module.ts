import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ThreadComponent } from './components/thread/thread.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'threads' },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'edit-user/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'threads', component: ThreadListComponent, canActivate: [AuthGuard] },
  { path: 'threads/:id', component: ThreadComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
