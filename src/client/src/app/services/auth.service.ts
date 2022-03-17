import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    const userJson = localStorage.getItem('currentUser');

    this.userSubject = new BehaviorSubject<User>(userJson !== null ? JSON.parse(userJson) : null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string) {
    // TODO: real login
    return this.http
      .get<User[]>(`${environment.apiUrl}/users?email=${email}`)
      .pipe(
        map((users) => {
          if (users.length === 0) {
            throw new Error('Invalid login.');
          }
          
          let user: User = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null as any);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(
      map(user => user?.username?.length > 0));
  }
}
