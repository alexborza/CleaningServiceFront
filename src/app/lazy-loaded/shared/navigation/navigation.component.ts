import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/core/model/representation/users/Role';
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

  activeBookCleaning: boolean;
  activeServices: boolean;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      const role = this.user.role;
      this.isClient = role === Role.USER;
      this.isAdmin = role === Role.ADMIN;
      this.isEmployee = role === Role.EMPLOYEE;
    }
  }

  onRouterLinkActive(event, type: string){
    switch(type){
      case "book-cleaning":
        if(event){
          setTimeout(() => {this.activeBookCleaning = event}, 100);
        } else {
          this.activeBookCleaning = event;
        }
        break
      case "services":
        if(event){
          setTimeout(() => {this.activeServices = event}, 100);
        } else {
          this.activeServices = event;
        }
        break;
      default:
        break;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
