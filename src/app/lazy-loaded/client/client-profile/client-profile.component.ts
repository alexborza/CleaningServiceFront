import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  items!: MenuItem[];
  username: string = "";
  id!: number;

  constructor(
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));
    this.menuInit();
    this.getUser();
  }

  private menuInit(){
    this.items = [
      {label: 'Account Settings', routerLink: 'account-settings', routerLinkActiveOptions: {exact: true}},
      {label: 'My Orders', routerLink: 'orders', routerLinkActiveOptions: {exact: false}}
    ]
  }

  private getUser(){
    const user = this.tokenStorage.getUser();
    this.username = user.username;
  }

}
