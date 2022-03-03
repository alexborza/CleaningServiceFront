import { Component } from '@angular/core';
import { RoleEnum } from './core/dto/RoleEnum';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  user: any;
  isLoggedIn = false;
  username?: string;
  isClient = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.isClient = this.roles.includes(RoleEnum.ROLE_USER);
      this.isAdmin = this.roles.includes(RoleEnum.ROLE_ADMIN);
      this.isEmployee = this.roles.includes(RoleEnum.ROLE_EMPLOYEE);
      this.username = this.user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
