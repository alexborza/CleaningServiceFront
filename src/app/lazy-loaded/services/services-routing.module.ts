import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningServiceType } from '../cleaning/models/cleaning-service-type';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {
    path: 'standard-cleaning',
    component: ServicesComponent,
    data: {
      title: 'Standard Cleaning',
      type: CleaningServiceType.StandardCleaning
    }
  },
  {
    path: 'disinfection-cleaning',
    component: ServicesComponent,
    data: {
      title: 'Disinfection and Environmental Cleaning',
      type: CleaningServiceType.DisinfectionCleaning
    }
  },
  {
    path: 'post-construction-cleaning',
    component: ServicesComponent,
    data: {
      title: 'Post Construction Cleaning',
      type: CleaningServiceType.PostContructionCleaning
    }
  },
  {
    path: 'deep-cleaning',
    component: ServicesComponent,
    data: {
      title: 'Deep Cleaning',
      type: CleaningServiceType.DeepCleaning
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
