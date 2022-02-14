import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  authenticatedUser: any;

  constructor(private tokenStorageService: TokenStorageService){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = route.data['role'];
      const canActivateWithoutAuthentication = route.data['canActivateWithoutAuthentication'];

      return new Promise((resolve) => {
        this.authenticatedUser = this.tokenStorageService.getUser();
        if(this.authenticatedUser != null){
          return resolve(this.isAuthorized(role));
        }
        if(canActivateWithoutAuthentication) {
          return resolve(true);
        }
        return resolve(false);
      })
  }

  private isAuthorized(role: string): boolean{
    if(this.authenticatedUser.roles.includes(role)){
      return true;
    }
    return false;
  }
  
}
