import { Component, Input, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/core/dto/RoleEnum';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user: any;
  isLoggedIn: boolean;
  isClient: boolean;
  isAdmin: boolean;
  isEmployee: boolean;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      const role = this.user.role;
      this.isClient = role === RoleEnum.ROLE_USER;
      this.isAdmin = role === RoleEnum.ROLE_ADMIN;
      this.isEmployee = role === RoleEnum.ROLE_EMPLOYEE;
    }
  }

  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
