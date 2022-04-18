import { Component } from '@angular/core';
import { RoleEnum } from './core/dto/RoleEnum';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor() {}

  ngOnInit(): void {}
}
