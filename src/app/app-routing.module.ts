import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren:() => import('./lazy-loaded/contact-us/contact-us.module').then(m=>m.ContactUsModule)
  },
  {
    path: 'book-a-cleaning',
    loadChildren:() => import('./lazy-loaded/cleaning/cleaning.module').then(m=>m.CleaningModule)
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
