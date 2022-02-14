import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { 
    path: 'signin', 
    component: SignupComponent, 
    data: {
      action: 'signin'
    } 
  },
  { 
    path: 'signup', 
    component: SignupComponent, 
    data: {
      action: 'signup'
    } 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
