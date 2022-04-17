import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() isLoggedIn: boolean;
  @Input() isClient: boolean;
  @Input() isAdmin: boolean;
  @Input() isEmployee: boolean;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
  }

  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
