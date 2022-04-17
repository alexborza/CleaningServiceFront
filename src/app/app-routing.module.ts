import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { AuthorizationGuard } from './core/guard/authorization.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren:() => import('./lazy-loaded/home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'services',
    loadChildren:() => import('./lazy-loaded/services/services.module').then(m=>m.ServicesModule)
  },
  {
    path: 'book-a-cleaning',
    loadChildren:() => import('./lazy-loaded/cleaning/cleaning.module').then(m=>m.CleaningModule),
    canActivate: [AuthorizationGuard],
    data: {
      role: "ROLE_USER",
      canActivateWithoutAuthentication: true
    }
  },
  {
    path: 'administrator',
    loadChildren:() => import('./lazy-loaded/administrator/administrator.module').then(m=>m.AdministratorModule),
    canActivate: [AuthorizationGuard],
    data: {
      role: "ROLE_ADMIN",
    }
  },
  {
    path: 'client/:userId',
    loadChildren:() => import('./lazy-loaded/client/client.module').then(m=>m.ClientModule),
    canActivate: [AuthorizationGuard],
    data: {
      role: "ROLE_USER",
    }
  },
  {
    path: 'employee/:userId',
    loadChildren:() => import('./lazy-loaded/employee/employee.module').then(m=>m.EmployeeModule),
    canActivate: [AuthorizationGuard],
    data: {
      role: "ROLE_EMPLOYEE",
    }
  },
  {
    path: 'login',
    loadChildren:() => import('./lazy-loaded/login/login.module').then(m=>m.LoginModule),
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
