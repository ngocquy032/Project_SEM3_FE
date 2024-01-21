import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  logOut(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');

    if (confirmLogout) {

      this.authService.logout();

      this.router.navigate(['']);

    }
  }
}
