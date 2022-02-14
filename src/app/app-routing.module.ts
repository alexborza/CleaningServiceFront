import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { AuthorizationGuard } from './core/guard/authorization.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren:() => import('./lazy-loaded/home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'services',
    loadChildren:() => import('./lazy-loaded/services/services.module').then(m=>m.ServicesModule)
  },
  {
    path: 'contact',
    loadChildren:() => import('./lazy-loaded/contact-us/contact-us.module').then(m=>m.ContactUsModule),
    canActivate: [AuthorizationGuard],
    data: {
      role: "ROLE_USER",
      canActivateWithoutAuthentication: true
    }
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
    path: 'login',
    loadChildren:() => import('./lazy-loaded/login/login.module').then(m=>m.LoginModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
