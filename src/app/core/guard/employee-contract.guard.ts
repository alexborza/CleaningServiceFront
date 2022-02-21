import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContractGuard implements CanActivate {

  constructor(private employeeService: EmployeeService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canAccessPath(route.url[0].path);
  }

  canAccessPath(url: string){
    switch(url){
      case 'personal-info':
        if(this.employeeService.canAccessUserInfo){
          return true;
        }
        return false;
      case 'job-info':
        if(this.employeeService.canAccessJobInfo){
          return true;
        }
        return false;
      case 'emergency-contact-info':
        if(this.employeeService.canAccessEmergencyInfo){
          return true;
        }
        return false;
      case 'confirmation':
        if(this.employeeService.canAccessConfirmation){
          return true;
        }
        return false;
      default:
        return true;
    }
  }
  
}
