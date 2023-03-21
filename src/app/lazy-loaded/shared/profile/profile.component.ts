import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  items: MenuItem[];
  username: string = "";
  role: string
  id: number;

  constructor(
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));
    this.getUser();
    this.menuInit();
  }

  private menuInit(){
    switch(this.role){
      case "EMPLOYEE":
        this.items = [
          {label: 'Account Settings', routerLink: 'account-settings', routerLinkActiveOptions: {exact: true}},
          {label: 'Agenda', routerLink: 'agenda', routerLinkActiveOptions: {exact: false}}
        ]
        break;
      case "CLIENT":
        this.items = [
          {label: 'Account Settings', routerLink: 'account-settings', routerLinkActiveOptions: {exact: true}},
          {label: 'My Orders', routerLink: 'orders', routerLinkActiveOptions: {exact: false}}
        ]
        break;
      case "ADMIN":
        this.items = [
          {label: 'Dashboard', routerLink: 'dashboard', routerLinkActiveOptions: {exact: true}},
          {label: 'Employees', routerLink: 'employees', routerLinkActiveOptions: {exact: false}},
          {label: 'New contract', routerLink: 'employee-contract', routerLinkActiveOptions: {exact: false} },
          {label: 'Services Agenda', routerLink: 'services-agenda', routerLinkActiveOptions: {exact: false}},
        ]
        break;
      default: 
        break;
    }
    
  }

  private getUser(){
    const user = this.tokenStorage.getUser();
    this.username = user.username;
    this.role = user.role;
  }

}
