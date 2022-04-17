import { Component } from '@angular/core';
import { RoleEnum } from './core/dto/RoleEnum';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  isClient = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const roles = this.tokenStorageService.getUser().roles;
      this.isClient = roles.includes(RoleEnum.ROLE_USER);
      this.isAdmin = roles.includes(RoleEnum.ROLE_ADMIN);
      this.isEmployee = roles.includes(RoleEnum.ROLE_EMPLOYEE);
    }
  }
}
