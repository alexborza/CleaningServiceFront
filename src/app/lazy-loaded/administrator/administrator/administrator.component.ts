import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  items!: MenuItem[];
  username: string = "";

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.menuInit();
    this.getUser()
  }

  private menuInit(){
    this.items = [
      {label: 'Dashboard', routerLink: '/administrator', routerLinkActiveOptions: {exact: true}},
      {label: 'Employees', routerLink: 'employees', routerLinkActiveOptions: {exact: false}},
      {label: 'New contract', routerLink: 'employee-contract', routerLinkActiveOptions: {exact: false} },
      {label: 'Services Agenda', routerLink: 'services-agenda', routerLinkActiveOptions: {exact: false}},
      {label: 'Quote Requests', routerLink: 'quote-requests', routerLinkActiveOptions: {exact: false}},
    ]
  }

  private getUser(){
    const user = this.tokenStorage.getUser();
    this.username = user.username;
  }

}
