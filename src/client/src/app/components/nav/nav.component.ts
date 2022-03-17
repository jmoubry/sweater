import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentUser: User;

  constructor(
    public authenticationService: AuthService,
    private router: Router
  ) {
    this.authenticationService.user.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
